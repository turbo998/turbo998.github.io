import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 8788);

const MOUNTS = [
  { prefix: '/voice', root: path.join(__dirname, 'voice') },
  { prefix: '/animation', root: path.join(__dirname, 'animation') },
  { prefix: '/game', root: path.join(__dirname, 'game') },
  { prefix: '/decision/harness-report', root: path.join(__dirname, 'decision', 'harness-report') },
  { prefix: '/decision/data', root: path.join(__dirname, 'decision', 'data') },
  { prefix: '/', root: __dirname }
];

const EXACT_FILES = new Map([
  ['/decision/strands-cards.html', path.join(__dirname, 'decision', 'strands-cards.html')],
  ['/decision/decision1-cards.html', path.join(__dirname, 'decision', 'decision1-cards.html')]
]);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.csv': 'text/csv; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.glb': 'model/gltf-binary',
  '.bin': 'application/octet-stream',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav'
};

// In-memory warm cache
const memoryCache = new Map();
let totalCachedBytes = 0;

function warmFile(absPath) {
  try {
    const stat = fs.statSync(absPath);
    if (!stat.isFile() || stat.size > 60 * 1024 * 1024) return;
    if (!memoryCache.has(absPath)) {
      const buf = fs.readFileSync(absPath);
      memoryCache.set(absPath, buf);
      totalCachedBytes += buf.length;
    }
  } catch (_) {}
}

function warmDirectory(dirPath) {
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        warmDirectory(full);
      } else if (entry.isFile()) {
        warmFile(full);
      }
    }
  } catch (_) {}
}

// Preload all 4 demo suites into RAM on startup
for (const [, target] of EXACT_FILES) warmFile(target);
for (const m of MOUNTS) warmDirectory(m.root);

function resolveFilePath(urlPath) {
  if (EXACT_FILES.has(urlPath)) {
    return { type: 'file', filePath: EXACT_FILES.get(urlPath) };
  }

  for (const mount of MOUNTS) {
    if (mount.prefix === '/') continue;
    if (urlPath === mount.prefix) {
      return { type: 'redirect', location: mount.prefix + '/' };
    }
    if (urlPath.startsWith(mount.prefix + '/')) {
      const rel = decodeURIComponent(urlPath.slice(mount.prefix.length + 1));
      const candidate = path.resolve(mount.root, rel);
      if (!candidate.startsWith(path.resolve(mount.root))) return { type: 'forbidden' };
      return inspectCandidate(candidate, urlPath);
    }
  }

  const rootRel = decodeURIComponent(urlPath.slice(1));
  const rootCandidate = path.resolve(__dirname, rootRel);
  if (!rootCandidate.startsWith(path.resolve(__dirname))) return { type: 'forbidden' };
  return inspectCandidate(rootCandidate, urlPath);
}

function inspectCandidate(candidate, urlPath) {
  try {
    const stat = fs.statSync(candidate);
    if (stat.isDirectory()) {
      if (!urlPath.endsWith('/')) {
        return { type: 'redirect', location: urlPath + '/' };
      }
      const idx = path.join(candidate, 'index.html');
      if (fs.existsSync(idx)) {
        return { type: 'file', filePath: idx };
      }
      return { type: 'notfound' };
    }
    if (stat.isFile()) {
      return { type: 'file', filePath: candidate };
    }
  } catch (_) {}
  return { type: 'notfound' };
}

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url || '/', `http://127.0.0.1:${PORT}`);
  const pathname = parsedUrl.pathname;

  if (pathname === '/api/warmup-status') {
    const payload = JSON.stringify({
      status: 'ready',
      port: PORT,
      cachedFiles: memoryCache.size,
      cachedMB: (totalCachedBytes / (1024 * 1024)).toFixed(2),
      suites: [
        { id: 'voice', repo: 'turbo998/voice-agent-lab', path: '/voice/index.html' },
        { id: 'animation', repo: 'turbo998/generative-visual-lab', path: '/animation/index.html' },
        { id: 'game', repo: 'turbo998/ai-gaming-lab', path: '/game/index.html' },
        { id: 'decision-strands', repo: 'turbo998/benchmark-harness-engineering', path: '/decision/strands-cards.html' },
        { id: 'decision-4engine', repo: 'turbo998/benchmark-harness-engineering', path: '/decision/decision1-cards.html' }
      ]
    });
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store'
    });
    res.end(payload);
    return;
  }

  const resolved = resolveFilePath(pathname);
  if (resolved.type === 'redirect') {
    res.writeHead(302, { Location: resolved.location });
    res.end();
    return;
  }
  if (resolved.type === 'forbidden') {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }
  if (resolved.type === 'notfound') {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`Not Found: ${pathname}`);
    return;
  }

  const filePath = resolved.filePath;
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  let data = memoryCache.get(filePath);
  if (!data) {
    try {
      data = fs.readFileSync(filePath);
      memoryCache.set(filePath, data);
      totalCachedBytes += data.length;
    } catch (_) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Internal Server Error');
      return;
    }
  }

  res.writeHead(200, {
    'Content-Type': contentType,
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'public, max-age=300'
  });
  res.end(data);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`[Partner AI Demo Warmup Server] Listening on http://127.0.0.1:${PORT}`);
  console.log(`[Warm Cache] Preloaded ${memoryCache.size} files (${(totalCachedBytes / (1024 * 1024)).toFixed(2)} MB in RAM)`);
});

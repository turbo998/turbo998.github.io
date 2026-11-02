const tracks = [
  ['data-infra', 'Data & Infra Lab', 'Data & Infra Lab · 数据与云底座'],
  ['infra', 'AI Infra', 'AI Infra · 算力与推理系统'],
  ['commerce', 'Agentic Commerce', '智能体商务'],
  ['voice', 'Voice', '语音'],
  ['benchmarks', 'Benchmarks & Harness', '测评与 Harness'],
  ['animation', 'Animation', '动画'],
  ['game', 'Gaming', '游戏'],
  ['security', 'AI Security', 'AI 安全']
];
const contextTracks = [...tracks, ['sa-skills', 'SA Skill & HVE Library', 'SA 技能与 HVE 资料库']];
function classifyPath(value, fallback = 'general') {
  const source = String(value || '').replaceAll('\\', '/').toLowerCase().split(/[?#]/)[0];
  if (/(?:^|\/)studio\/(?:zh-)?([a-z-]+)\.html$/.test(source)) {
    const id = source.match(/(?:zh-)?([a-z-]+)\.html$/)[1].replace(/^zh-/, '');
    if (tracks.some(([track]) => track === id)) return id;
  }
  if (/azure-sa-skills|copilot-hve-engineering-workshop/.test(source)) return 'sa-skills';
  if (/ai-infra-(?:architect-workbench|phase179)|deepinfer|e2b-nomad|alibaba-cloud-ai-infra|ai-infra-research/.test(source)) return 'infra';
  // The playbook is the cross-runtime architectural guide, not a capacity simulator.
  if (/workshops\/azure-agent-infra\/index(?:\.en)?\.html$/.test(source)) return 'infra';
  if (/azure-infra-lab|workshops\/(?:azure-agent-infra|data-lab|azure-vm-modernization|fabcon-sqlcon-2026)(?:\/|$)|docs\/azure-agent-infra\/assets\/(?:04|05)-/.test(source)) return 'data-infra';
  if (/ai-infra-lab/.test(source)) return 'infra';
  if (/agentic-commerce|webiq-azure/.test(source)) return 'commerce';
  if (/(?:^|\/)voice(?:\/|$)/.test(source)) return 'voice';
  if (/ai-security/.test(source)) return 'security';
  if (/(?:^|\/)(?:animation|generative-visual-lab|bilibili-explainers)(?:\/|$)|pelican/.test(source)) return 'animation';
  if (/(?:^|\/)game(?:\/|$)/.test(source)) return 'game';
  if (/benchmarks|benchmark-harness|faf-vs-agent-forge|maf-multi-agent-benchmark|github-radar|github-trending-radar|openrouter/.test(source)) return 'benchmarks';
  return fallback;
}
const classifyScene = scene => classifyPath(scene.raw || scene.plannedNativeResources?.en?.url, scene.track || 'general');
const classifyResource = resource => classifyPath(resource.proposedNativeResources?.en?.url || resource.url, resource.track || 'general');
const classifyPage = page => classifyPath(page.translation?.sourcePath || page.path, page.tracks?.[0] || page.track || 'general');
module.exports = {tracks, contextTracks, classifyPath, classifyScene, classifyResource, classifyPage};

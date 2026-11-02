"""Optional local-only draft dictionary preparation; site builds use checked-in JSON, not Python.
Requires ctranslate2 + sentencepiece and the Argos 1.9 zh_en model directory.
No source content leaves this process. Numerical tokens are never sent for translation.
"""
import json
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
CACHE = HERE / 'demos-cache'
sys.path.insert(0, str(CACHE / 'deps'))
import ctranslate2
import sentencepiece


def translate(direction):
    source = json.loads((CACHE / f'{direction}-input.json').read_text(encoding='utf-8'))
    destination = HERE / f'demos-{direction}.json'
    existing = json.loads(destination.read_text(encoding='utf-8')) if destination.exists() else {}
    model_dir = CACHE / direction / ('translate-' + direction.replace('-', '_') + '-1_9')
    tokenizer = sentencepiece.SentencePieceProcessor(model_file=str(model_dir / 'sentencepiece.model'))
    translator = ctranslate2.Translator(str(model_dir / 'model'), device='cpu', compute_type='int8', inter_threads=2, intra_threads=4)
    existing = {k: v.replace('▁', ' ').strip() for k, v in existing.items()}
    pending = sorted([s for s in source if s not in existing], key=len)
    for start in range(0, len(pending), 64):
        batch = pending[start:start + 64]
        results = translator.translate_batch([tokenizer.encode(s, out_type=str) for s in batch], beam_size=1, max_decoding_length=160)
        for text, result in zip(batch, results):
            value = ''.join(result.hypotheses[0]).replace('▁', ' ').strip()
            existing[text] = value
        destination.write_text(json.dumps(dict(sorted(existing.items())), ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
        print(direction, min(start + 64, len(pending)), '/', len(pending), flush=True)

for direction in sys.argv[1:] or ['zh-en']:
    if direction != 'zh-en':
        raise ValueError('Chinese localization uses manually reviewed dictionaries, not machine drafts.')
    translate(direction)

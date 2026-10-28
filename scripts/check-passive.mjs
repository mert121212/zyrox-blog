import fs from 'fs';

function stripMarkdown(md) {
  return md
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`{3}[\s\S]*?`{3}/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    .replace(/^\s*>\s+/gm, '')
    .replace(/\|[-:\s|]+\|/g, '')
    .replace(/\|/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^[-*_]{3,}\s*$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function splitSentences(text) {
  return text
    .replace(/\betc\./gi, 'etc\u200B')
    .replace(/\be\.g\./gi, 'eg\u200B')
    .replace(/\bi\.e\./gi, 'ie\u200B')
    .replace(/\bvs\./gi, 'vs\u200B')
    .replace(/\bdr\./gi, 'dr\u200B')
    .replace(/\bprof\./gi, 'prof\u200B')
    .replace(/\bvb\./g, 'vb\u200B')
    .replace(/\d+\./g, m => m.replace('.', '\u200B'))
    .split(/[.!?]+/)
    .map(s => s.replace(/\u200B/g, '.').trim())
    .filter(s => s.length > 3);
}

const file = process.argv[2];
let content = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
const body = match ? match[2] : content;
const plain = stripMarkdown(body);
const sentences = splitSentences(plain);

const enPassive = /\b(is|are|was|were|be|been|being)\s+\w+(?:ed|en|ied)\b/i;
const trPassive = /[aeıioöuü]l[iıuü](?:r|n|yor|p)|[aeıioöuü]l(?:mak|mek|di|miş)/i;

sentences.forEach((s, idx) => {
  const enM = s.match(enPassive);
  const trM = s.match(trPassive);
  if (enM || trM) {
    console.log(`Sentence [${idx}]:`);
    if (enM) console.log(`  enPassive: "${enM[0]}"`);
    if (trM) console.log(`  trPassive: "${trM[0]}"`);
    console.log(`  text: ${s.slice(0, 100)}...\n`);
  }
});

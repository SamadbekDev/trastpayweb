// Lists Russian string literals of a source file that have no entry in the given dictionaries.
// Usage: node scripts/i18n-check.mjs <source.ts> <dict.ts> [more dicts…]
//        node scripts/i18n-check.mjs --all   (checks the pairs in PAIRS below)
import fs from "node:fs";

const CYR = /[А-Яа-яЁё]/;
const norm = (s) => s.replace(/\s+/g, " ").trim();

/** String literals ("…", '…', `…` without ${}) containing Cyrillic; comments are skipped. */
export function literals(src) {
  const code = src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:"'`])\/\/.*$/gm, "$1");
  const out = new Set();
  for (const m of code.matchAll(/"((?:[^"\\\n]|\\.)*)"|'((?:[^'\\\n]|\\.)*)'|`((?:[^`\\$]|\\.)*)`/g)) {
    const s = (m[1] ?? m[2] ?? m[3]).replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\n/g, " ");
    if (CYR.test(s)) out.add(norm(s));
  }
  // JSX text between tags
  for (const m of code.matchAll(/>([^<>{}]*[А-Яа-яЁё][^<>{}]*)</g)) out.add(norm(m[1]));
  return [...out].filter(Boolean);
}

function dictKeys(file) {
  const src = fs.readFileSync(file, "utf8");
  const keys = new Set();
  for (const m of src.matchAll(/^\s*("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')\s*:\s*\{/gm)) keys.add(norm(JSON.parse(m[1].startsWith("'") ? `"${m[1].slice(1, -1).replace(/"/g, '\\"')}"` : m[1])));
  return keys;
}

const PAIRS = JSON.parse(fs.existsSync("scripts/i18n-pairs.json") ? fs.readFileSync("scripts/i18n-pairs.json", "utf8") : "[]");

const args = process.argv.slice(2);
const jobs = args[0] === "--all" ? PAIRS : [[args[0], ...args.slice(1)]];
let missingTotal = 0;
for (const [source, ...dicts] of jobs) {
  const have = new Set(dicts.flatMap((d) => [...dictKeys(d)]));
  const missing = literals(fs.readFileSync(source, "utf8")).filter((s) => !have.has(s));
  missingTotal += missing.length;
  if (missing.length) console.log(`\n# ${source}: ${missing.length} missing\n` + missing.map((s) => JSON.stringify(s)).join("\n"));
}
console.log(`\nmissing total: ${missingTotal}`);
process.exitCode = missingTotal ? 1 : 0;

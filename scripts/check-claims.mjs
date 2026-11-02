// Build oldidan tekshiruv: saytga kompaniyada YO'Q sertifikat/hamkorlar qayta
// tushib qolmasin. Topilsa build to'xtaydi (Vercel deploy ham o'tmaydi).
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const FORBIDDEN = [
  /ISO\s*9001/i,
  /Netherlands\s+Fruit\s+Solutions/i,
  /Eksport\s+sertifikati/i,
  /Экспортный\s+сертификат/i,
];
const ROOTS = ["src"];
const EXT = /\.(tsx?|jsx?|json|mdx?)$/;

const hits = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (EXT.test(name)) {
      readFileSync(p, "utf8").split("\n").forEach((line, i) => {
        if (FORBIDDEN.some((re) => re.test(line))) hits.push(`${p}:${i + 1}: ${line.trim()}`);
      });
    }
  }
};
ROOTS.forEach(walk);

if (hits.length) {
  console.error("\n✖ Saytda bizda YO'Q sertifikat/hamkor yozuvi topildi:\n" + hits.join("\n") + "\n");
  process.exit(1);
}
console.log("✓ check-claims: soxta sertifikat yozuvi yo'q");

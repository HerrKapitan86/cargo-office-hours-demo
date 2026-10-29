import { readFileSync } from "node:fs";
import { prioritize, type Account, type Rules } from "../../infra/office-hours/prioritize.ts";

const read = (path: string) => JSON.parse(readFileSync(new URL(path, import.meta.url), "utf8"));
const records = read("../../evals/office-hours/accounts.json") as Account[];
const baseline = read("../../evals/office-hours/baseline-rules.json") as Rules;
const proposed = read("../../evals/office-hours/proposed-rules.json") as Rules;

console.log("LOCAL PREVIEW: five synthetic accounts, no Cargo API calls.\n");
console.log("Comparing the baseline with a prepared proposal, not a live AI response.\n");

let changed = 0;
for (const record of records) {
  const before = prioritize({ record, rules: baseline });
  const after = prioritize({ record, rules: proposed });
  if (before.priority !== after.priority) changed++;
  console.log(`${record.company}: ${before.priority} → ${after.priority}`);
  console.log(`  Baseline: ${before.reason}`);
  console.log(`  Proposed: ${after.reason}`);
  console.log(`  Next step: ${after.next_step}\n`);
}

console.log(`${changed} of ${records.length} priorities changed. Active rules were not edited.`);
console.log("This is a comparison on the same sample. Test fresh accounts before drawing broader conclusions.");

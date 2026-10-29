import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { prioritize, type Account, type Rules } from "../../infra/office-hours/prioritize.ts";

const records = JSON.parse(readFileSync(new URL("./accounts.json", import.meta.url), "utf8")) as Account[];
const baseline = JSON.parse(readFileSync(new URL("./baseline-rules.json", import.meta.url), "utf8")) as Rules;
const revised = JSON.parse(readFileSync(new URL("./proposed-rules.json", import.meta.url), "utf8")) as Rules;

test("baseline distinguishes signal, fit and uncertainty across all five accounts", () => {
  const decisions = records.map(record => prioritize({ record, rules: baseline }));
  assert.deepEqual(decisions.map(d => [d.account_key, d.priority]), [
    ["northstar", "Contact first"],
    ["juniper-studio", "Contact first"],
    ["harbor", "Keep watching"],
    ["sprout", "Exclude"],
    ["mosaic", "Research needed"],
  ]);
  assert.ok(decisions.every(d => d.reason && d.next_step && d.source_ref.startsWith("fixture:")));
});

test("reviewed services exclusion changes Juniper only", () => {
  const changes = records.filter(record => prioritize({ record, rules: baseline }).priority !== prioritize({ record, rules: revised }).priority);
  assert.deepEqual(changes.map(r => r.account_key), ["juniper-studio"]);
  const decision = prioritize({ record: records[1]!, rules: revised });
  assert.equal(decision.priority, "Exclude");
  assert.match(decision.reason, /services is excluded/);
});

test("a signal never overrides an explicit size exclusion", () => {
  const decision = prioritize({ record: records[3]!, rules: baseline });
  assert.equal(decision.priority, "Exclude");
  assert.match(decision.reason, /12 employees/);
});

test("missing, invalid and future signal dates require research", () => {
  for (const date of ["", "not-a-date", "2026-10-30"]) {
    const decision = prioritize({ record: { ...records[0]!, signal_observed_at: date }, rules: baseline });
    assert.equal(decision.priority, "Research needed", date);
  }
});

test("stale or unsupported signal cannot earn first priority", () => {
  assert.equal(prioritize({ record: { ...records[0]!, signal_observed_at: "2026-08-01" }, rules: baseline }).priority, "Keep watching");
  assert.equal(prioritize({ record: { ...records[0]!, source_ref: "" }, rules: baseline }).priority, "Research needed");
  assert.equal(prioritize({ record: { ...records[0]!, signal_evidence: "" }, rules: baseline }).priority, "Research needed");
});

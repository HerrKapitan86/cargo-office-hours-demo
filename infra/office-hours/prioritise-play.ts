import { readFileSync } from "node:fs";
import { definePlay, defineWorkflow } from "@cargo-ai/cdk";
import { z } from "zod";
import { accounts } from "./accounts.ts";
import { prioritize } from "./prioritize.ts";

const rulesSchema = z.object({
  version: z.string().min(1),
  goal: z.string().min(1),
  as_of: z.iso.date(),
  employee_min: z.number().int().nonnegative(),
  employee_max: z.number().int().nonnegative(),
  excluded_business_models: z.array(z.string()),
  priority_signal: z.string().min(1),
  signal_max_age_days: z.number().int().nonnegative(),
}).refine(rules => rules.employee_max >= rules.employee_min, "employee_max must be at least employee_min");

const rules = rulesSchema.parse(JSON.parse(readFileSync(new URL("../../context/motion/office-hours/rules.json", import.meta.url), "utf8")));

export const prioritiseWorkflow = defineWorkflow("prioritise-office-hours-account", {
  input: z.object({
    account_key: z.string(),
    company: z.string(),
    business_model: z.string(),
    employees: z.number().nullable(),
    is_b2b: z.boolean().nullable(),
    signal_type: z.string(),
    signal_observed_at: z.string(),
    profile_evidence: z.string(),
    signal_evidence: z.string(),
    source_ref: z.string(),
  }),
  output: z.object({
    account_key: z.string(),
    company: z.string(),
    priority: z.string(),
    priority_rank: z.number(),
    reason: z.string(),
    next_step: z.string(),
    source_ref: z.string(),
    rule_version: z.string(),
    evaluated_as_of: z.string(),
    evaluated_at: z.string(),
  }),
  imports: { accounts, prioritize, rules },
}, ({ input, model }) => {
  const decision = prioritize({ record: input, rules });
  model.update({
    modelUuid: accounts.uuid,
    matchingColumnSlug: "account_key",
    matchingValue: input.account_key,
    mappings: [
      { columnSlug: "priority", value: decision.priority },
      { columnSlug: "priority_rank", value: decision.priority_rank },
      { columnSlug: "reason", value: decision.reason },
      { columnSlug: "next_step", value: decision.next_step },
      { columnSlug: "rule_version", value: decision.rule_version },
      { columnSlug: "evaluated_as_of", value: decision.evaluated_as_of },
      { columnSlug: "evaluated_at", value: decision.evaluated_at },
    ],
  });
  return decision;
});

export const prioritisePlay = definePlay("prioritise-office-hours-accounts", {
  name: "Who should we contact next?",
  description: "Apply explicit targeting rules to five prepared synthetic accounts; persist priority, reason and next step. Manual demo only.",
  model: accounts,
  workflow: prioritiseWorkflow,
  isEnabled: false,
  changeKinds: ["added", "updated", "unchanged"],
  runCreationRule: "always",
  limit: 5,
});

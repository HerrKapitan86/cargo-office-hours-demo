import { defineModel } from "@cargo-ai/cdk";

export const accounts = defineModel("office_hours_accounts", {
  kind: "native",
  name: "Office hours: five accounts",
  description: "Five synthetic accounts used only for the 29 October office-hours demonstration.",
  extractSlug: "defineCustom",
  config: {
    columns: [
      { slug: "account_key", type: "string" },
      { slug: "company", type: "string" },
      { slug: "business_model", type: "string" },
      { slug: "employees", type: "number" },
      { slug: "is_b2b", type: "boolean" },
      { slug: "signal_type", type: "string" },
      { slug: "signal_observed_at", type: "string" },
      { slug: "profile_evidence", type: "string" },
      { slug: "signal_evidence", type: "string" },
      { slug: "source_ref", type: "string" },
      { slug: "priority", type: "string" },
      { slug: "priority_rank", type: "number" },
      { slug: "reason", type: "string" },
      { slug: "next_step", type: "string" },
      { slug: "rule_version", type: "string" },
      { slug: "evaluated_as_of", type: "string" },
      { slug: "evaluated_at", type: "string" },
    ]
  }
});

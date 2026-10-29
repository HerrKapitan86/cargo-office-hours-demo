import { defineScript } from "@cargo-ai/cdk";

export type Account = {
  account_key: string;
  company: string;
  business_model: string;
  employees: number | null;
  is_b2b: boolean | null;
  signal_type: string;
  signal_observed_at: string;
  profile_evidence: string;
  signal_evidence: string;
  source_ref: string;
};

export type Rules = {
  version: string;
  goal: string;
  as_of: string;
  employee_min: number;
  employee_max: number;
  excluded_business_models: string[];
  priority_signal: string;
  signal_max_age_days: number;
};

export const prioritize = defineScript(({ record, rules }: { record: Account; rules: Rules }) => {
  let priority = "Research needed";
  let priority_rank = 3;
  let reason = "Account evidence is incomplete.";
  let next_step = "Verify customer type, business model and employee count.";
  const validSize = typeof record.employees === "number" && Number.isFinite(record.employees) && record.employees >= 0;
  const knownModel = record.business_model !== "" && record.business_model !== "unknown";

  if (record.is_b2b === false) {
    priority = "Exclude";
    priority_rank = 4;
    reason = "The brief targets B2B accounts; this account is not B2B.";
    next_step = "Keep out of this target list.";
  } else if (validSize && (record.employees! < rules.employee_min || record.employees! > rules.employee_max)) {
    priority = "Exclude";
    priority_rank = 4;
    reason = `${record.employees} employees is outside the ${rules.employee_min}-${rules.employee_max} target range.`;
    next_step = "Keep out of this target list.";
  } else if (rules.excluded_business_models.includes(record.business_model)) {
    priority = "Exclude";
    priority_rank = 4;
    reason = `${record.business_model} is excluded by the reviewed targeting rule.`;
    next_step = "Keep out of this target list.";
  } else if (record.is_b2b === true && validSize && knownModel) {
    if (record.signal_type === rules.priority_signal) {
      const observed = Date.parse(record.signal_observed_at);
      const asOf = Date.parse(rules.as_of);
      const ageDays = (asOf - observed) / 86_400_000;
      if (!Number.isFinite(observed) || !Number.isFinite(ageDays) || ageDays < 0) {
        reason = "Account fits, but the signal date is missing, invalid or in the future.";
        next_step = "Verify when the signal occurred before prioritising.";
      } else if (!record.signal_evidence.trim() || !record.source_ref.trim()) {
        reason = "Account fits, but the signal has no supporting evidence or source.";
        next_step = "Verify and attach evidence before prioritising.";
      } else if (ageDays <= rules.signal_max_age_days) {
        priority = "Contact first";
        priority_rank = 1;
        reason = `B2B, ${record.employees} employees, with a sales-team expansion signal ${Math.floor(ageDays)} days ago.`;
        next_step = "Review the signal and prepare a relevant first conversation.";
      } else {
        priority = "Keep watching";
        priority_rank = 2;
        reason = `Account fits, but its signal is older than ${rules.signal_max_age_days} days.`;
        next_step = "Look for a current buying signal.";
      }
    } else {
      priority = "Keep watching";
      priority_rank = 2;
      reason = "Account fits, with no matching buying signal in the supplied evidence.";
      next_step = "Watch for a relevant signal before prioritising outreach.";
    }
  }

  return {
    account_key: record.account_key,
    company: record.company,
    priority,
    priority_rank,
    reason,
    next_step,
    source_ref: record.source_ref,
    rule_version: rules.version,
    evaluated_as_of: rules.as_of,
    evaluated_at: new Date().toISOString(),
  };
});

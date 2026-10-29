---
title: Office-hours demo outcome
description: One human-owned, checkable teaching outcome with a manual Cargo play behind it.
---

## O1. All ten sample account decisions are reproducible and explainable

- **Why:** Let attendees inspect where targeting context, workflow code and regression checks live in a Manifest repository, then see one reviewed correction change a decision.
- **Owner:** Tariq Minhas.
- **Metric:** Count matching expected priorities for each of the five synthetic account keys under both baseline and proposed rules, using the fixed evaluation date 2026-10-29. The maximum is ten matches. Every decision must also include a reason, evidence reference and next step.
- **Baseline:** Zero demo account cases in the unfilled Manifest scaffold inspected on 2026-10-29. This is a repository coverage baseline, not historical customer performance.
- **Target:** Ten of ten expected priorities, with the required explanation fields, by 2026-10-29. Juniper Studio is the only account whose priority changes after the services exclusion.
- **Verify:** Run the local preview with `npm run demo` and the regression checks in [evals/office-hours/](../evals/office-hours/) with `npm test`. Inspect the explicit targeting rules in [the scoring motion](../context/motion/office-hours.md).
- **Becomes:** The manually run play in [infra/office-hours/prioritise-play.ts](../infra/office-hours/prioritise-play.ts), using [the decision function](../infra/office-hours/prioritize.ts). Automatic triggering remains disabled.
- **Serves:** All three moves in [the demo plan](company-plan.md).

Tariq owns the outcome. No agent receives an unattended experiment budget, permission to send messages or permission to deploy to someone else's workspace.

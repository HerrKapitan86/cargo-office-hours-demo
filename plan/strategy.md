---
title: Office-hours demo strategy
description: Teach an inspectable account-prioritisation loop with synthetic evidence and human-reviewed changes.
---

## Who we sell to

The demonstration's hypothetical target is defined in [the demo ICP](../context/icp/office-hours-demo.md). This is a fictional sales-operations product used to explain the workflow, not Cargo's commercial ICP. No buyer persona or real prospect list is asserted.

## Segments

| Segment | Definition | Motion |
| --- | --- | --- |
| Five teaching accounts | The supplied synthetic fixtures, evaluated against the written brief | [Manual account prioritisation](../context/motion/office-hours.md) |

## Motions

The [scoring motion](../context/motion/office-hours.md) applies explicit fit and signal rules, then stores a priority, reason and suggested next step. Tariq supplies feedback on one result, reviews the proposed change and decides whether to deploy it before another manual run.

The coding agent assists with diagnosis and code or context changes. Deterministic code calculates priority. The local preview uses a prepared proposal and does not call an AI agent.

## The bets

1. A services exclusion will move only Juniper Studio from Contact first to Exclude on the same five-account sample. Check on 2026-10-29; the demo fails this check if Juniper remains prioritised or any other account's priority changes. [Regression checks](../evals/office-hours/) make this falsifiable.

## What we are NOT doing

- Claiming generalisation from the same-sample comparison. Fresh examples are a separate validation step.
- Fetching live signals or analysing calls. Evidence is supplied in the synthetic fixtures.
- Sending messages, updating a CRM or scheduling runs. The [scoring motion](../context/motion/office-hours.md) ends with an inspectable decision.
- Treating publication to GitHub as a deployment. A reader must connect their own Cargo workspace and review the deployment plan separately.

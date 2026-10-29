---
title: Five-account prioritisation demonstration
description: Apply explicit targeting rules, inspect one bad fit and review a minimal correction.
kind: scoring
references:
  - icp/office-hours-demo
---

## Serves

The office-hours teaching outcome in `plan/outcomes.md`: show one decision that a person can inspect, correct and run again.

## Trigger

A person requests a five-account demonstration. The Cargo play has automatic triggering disabled.

## Audience

The synthetic target profile is [[icp/office-hours-demo]]. The example accounts are teaching fixtures, not real prospects or customers.

## Channel

Priorities, reasons and suggested next steps appear in the Cargo account model. No message is sent.

## Sequence

1. Apply `context/motion/office-hours/rules.json` to the five prepared records.
2. Inspect Juniper Studio's result and its evidence that it sells services.
3. Give the feedback: “We only want product businesses. Juniper Studio sells services.”
4. Review the proposed exclusion in `evals/office-hours/proposed-rules.json`.
5. After approval, deploy the changed rule through the connected project's review workflow and run the manual play again.
6. Compare the stored results and test fresh examples before drawing broader conclusions.

## Proof

The local regression suite checks the supplied fixtures and invalid or stale signals. This is evidence about the example's behaviour, not proof of commercial performance or generalisation.

## Success metric

All five accounts receive an explained decision. The reviewed services exclusion changes Juniper Studio from Contact first to Exclude, while the other four priorities stay the same.

## Owner

Tariq Minhas, session presenter.

## Implementation

`infra/office-hours/prioritise-play.ts` declares the manual play. `infra/office-hours/prioritize.ts` applies the rules deterministically. `evals/office-hours/prioritize.test.ts` checks the decisions; `scripts/ops/office-hours.ts` previews the baseline and prepared correction locally.

The rules are compiled into the deployed workflow. Editing a local file alone does not change a live play. The coding agent proposes a correction; a human reviews it. This repository is not connected to a Cargo workspace until its owner completes that setup.

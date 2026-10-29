---
title: Local office-hours example verification
description: The deterministic preview compared five synthetic accounts under baseline and proposed targeting rules.
outcome: "Five baseline and five revised decisions reproduced; Juniper alone changed priority. No commercial outcome measured."
date: 2026-10-29
serves: O1
---

## What ran

The local `npm run demo` preview called `infra/office-hours/prioritize.ts` with the synthetic fixtures and frozen rule files in `evals/office-hours/`. This command does not execute a Cargo batch or call an AI agent.

## Headline result

Juniper Studio changed from Contact first to Exclude under the prepared services exclusion. The other four priorities stayed the same. The full command output is in [local-preview.txt](local-preview.txt).

## What this establishes

The supplied correction changes the intended decision on the original sample. It does not establish commercial performance, autonomous learning or generalisation to fresh accounts. The active rules and deployed state were not changed by the local preview.

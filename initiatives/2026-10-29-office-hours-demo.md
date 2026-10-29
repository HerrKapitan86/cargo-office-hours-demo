---
title: Five-account office-hours demonstration
description: Use the Manifest template to show targeting context, one manual play and a reviewed services exclusion.
status: active
owner: Tariq Minhas
deadline: 2026-10-29
serves: O1 in plan/outcomes.md
---

## Why now

Tariq requested a public repository for the 2026-10-29 office-hours session so attendees can see where the context, code and reviewed change end up. The demo should make one decision loop inspectable in the actual Manifest structure.

## Success criteria

- [ ] The repository contains five labelled synthetic accounts, the active targeting brief and one disabled-for-automatic-triggering Cargo play.
- [ ] The local preview and regression checks reproduce all five baseline and all five revised priorities, with only Juniper Studio changing priority.
- [ ] Attendees can find the setup prompt, slides, context, play source and regression checks from the repository README.
- [ ] Tariq can show the proposed services exclusion and explain that deployment requires review and that fresh examples are needed for validation beyond this sample.

## Approach

1. Keep targeting knowledge in [the demo ICP](../context/icp/office-hours-demo.md) and [scoring motion](../context/motion/office-hours.md).
2. Put the account model, decision function, play and presenter view in [infra/office-hours/](../infra/office-hours/).
3. Keep the baseline and prepared correction explicit, and compare them with [evals/office-hours/](../evals/office-hours/).
4. Present the inspected result and the small reviewed correction. Leave customer outreach, live signal collection, CRM writes and scheduled execution outside the exercise.

## Dependencies

- Node.js 22 or later for the local preview and checks.
- A reader's own Cargo identity and workspace for any live deployment; no credentials or presenter state are included.
- Tariq's review before presenting or applying the correction in a live workspace.

## Log

- 2026-10-29: Tariq requested a personal GitHub demo repository using the actual Cargo Manifest template. This initiative records the teaching scope and acceptance checks; it does not claim the live session has happened.

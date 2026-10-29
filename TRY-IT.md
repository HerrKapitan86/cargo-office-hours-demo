# Try the office-hours workflow

Build one small workflow: **Which accounts should we contact next, and why?**

Open this repository in Claude Code, Cursor or Codex. For local setup, you need Node.js 22 or later. Conductor is optional. Cargo's [installation guide](https://api.getcargo.io/INSTALL.md) covers the CLI, sign-in and skills for your coding agent.

Use the included `evals/office-hours/accounts.json`, or bring five accounts of your own with the facts and evidence you want to use. The supplied accounts and signals are synthetic teaching data.

Paste this into your coding agent:

```text
Help me build a small Cargo workflow that answers:
“Which accounts should we contact next, and why?”

Follow https://api.getcargo.io/INSTALL.md for setup. Load the Cargo
project skill, inspect and reuse this Manifest repository,
and confirm which workspace we will use before changing it.
Follow AGENTS.md and the project review workflow.

Ask me who we target, who we exclude, and which buying signal matters.
Save my answers as readable context and explicit rules in the project.

Use the five accounts I provide. Build one manually run Cargo play
that applies those rules and stores a priority, reason, evidence
reference and suggested next step for each account. Use these labels:
Contact first, Keep watching, Research needed, Exclude.

Treat missing targeting facts as Research needed. A suitable account
without a verified buying signal can be Keep watching. Do not invent
evidence. Keep the priority calculation deterministic.

Set up the project state and GitHub connection with me. Show me the
plan and estimated pilot cost before I approve a deployment through
the project review workflow and the first run. Use the supplied data; keep live enrichment,
schedules, outreach and CRM updates off for this exercise.

Read back all five stored results. Let me correct one result, diagnose
whether the problem is the data, missing research or the targeting
rule, and propose the smallest change. Wait for my approval, rerun,
and show what changed. Then help me test it on fresh examples.
```

To use the session's sample, give this initial targeting brief when asked:

> We sell a sales-operations product to B2B companies with 50–200 employees. Prioritise accounts with a sales-team expansion signal in the last 45 days. I haven't specified any business-model exclusions yet. For this historical sample, evaluate freshness as of 29 October 2026.

After the first run, give this feedback:

> Juniper Studio sells services. We want product businesses. Why did it qualify, and what is the smallest correction? Show me the change before applying it.

The expected change is that Juniper becomes **Exclude**, while the other four results stay the same. This checks the correction on the original sample. Fresh examples are needed to see whether the rule holds beyond it.

This repository contains the workflow implementation for your agent to adapt. The presenter's `demo` shortcuts are custom commands; `npm run demo` runs this repository's local preview. Fork the repository if you want your own GitHub copy for sharing changes or reviewing pull requests.

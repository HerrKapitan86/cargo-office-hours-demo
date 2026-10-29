# Cargo Manifest: office-hours demo

**Which accounts should we contact next, and why?**

This is a working example built from the official [Cargo Manifest template](https://github.com/getcargohq/cargo-manifest/tree/49351e670289775e9ee8a288b3580a81a0fad3ad). It was scaffolded with `cargo-ai project init` using CLI 1.0.139, then seeded with the account-prioritisation play shown in Cargo's 29 October 2026 office hours. Five synthetic accounts go through explicit targeting rules. A human flags one bad fit, reviews a proposed rule change, then runs the play again.

[Try it with your coding agent](TRY-IT.md) · [Slides (PDF)](slides/office-hours.pdf) · [Offline HTML deck](slides/office-hours.html)

## The Manifest structure

The template's layers, context sync, agent instructions, skills and PR checks are retained. The demo fills one small path through them:

| Layer | This example |
| --- | --- |
| `plan/` | The teaching goal, strategy and checkable outcome. |
| `context/` | The synthetic ICP, motion and active targeting rules. |
| `initiatives/` | The bounded office-hours demonstration. |
| `cadence/` | The presenter's remaining steps. |
| `infra/` | Context sync, model, manual play and account view. |
| `evals/` | Five fixtures, the prepared correction and regression tests. |
| `outputs/` | The archive for observed results. |
| `scripts/` | The local preview and template checks. |

The other knowledge domains retain their empty templates. [MANIFEST.md](MANIFEST.md) explains the full framework. The template's dependency updater is manual in this demo, so publishing it starts no scheduled work.

## Where the demo code lives

| File | What it does |
| --- | --- |
| [`context/motion/office-hours.md`](context/motion/office-hours.md) | Explains the targeting brief and feedback loop. |
| [`context/motion/office-hours/rules.json`](context/motion/office-hours/rules.json) | Holds the active criteria: fit, exclusions, signal and freshness. |
| [`evals/office-hours/accounts.json`](evals/office-hours/accounts.json) | Contains the five synthetic accounts and their evidence. |
| [`infra/office-hours/accounts.ts`](infra/office-hours/accounts.ts) | Declares the Cargo account model and fields. |
| [`infra/office-hours/prioritize.ts`](infra/office-hours/prioritize.ts) | Applies the explicit rules and explains each decision. |
| [`infra/office-hours/prioritise-play.ts`](infra/office-hours/prioritise-play.ts) | Declares the manual Cargo play and writes its results onto accounts. |
| [`infra/office-hours/presenter-view.ts`](infra/office-hours/presenter-view.ts) | Defines the account table: company, priority, reason and next step. |
| [`evals/office-hours/proposed-rules.json`](evals/office-hours/proposed-rules.json) | Shows the prepared services exclusion for review. |
| [`evals/office-hours/prioritize.test.ts`](evals/office-hours/prioritize.test.ts) | Checks the five outcomes, exclusion precedence and missing or stale evidence. |

GitHub stores the source and its history. Cargo runs the deployed play and stores the account results. The rules are compiled into the play, so changing a local file requires a reviewed deployment before it affects a live run.

## Run the example locally

Use Node.js 22 or later:

```sh
git clone https://github.com/HerrKapitan86/cargo-office-hours-demo.git
cd cargo-office-hours-demo
npm ci
npm run demo
```

The local preview calls the same decision function used by the Cargo play. It compares the baseline with the supplied, prepared correction. It does not need Cargo login, call an AI agent or deploy anything.

| Account | Baseline | After the services exclusion |
| --- | --- | --- |
| Northstar | Contact first | Contact first |
| Juniper Studio | Contact first | Exclude |
| Harbor | Keep watching | Keep watching |
| Sprout | Exclude | Exclude |
| Mosaic | Research needed | Research needed |

The sample fixes its evaluation date at **2026-10-29**, so signal freshness stays reproducible.

## Show the feedback change

[View the example change on GitHub](https://github.com/HerrKapitan86/cargo-office-hours-demo/compare/main...example/exclude-services).

The feedback is: “We only want product businesses. Juniper Studio sells services.”

The reviewed correction is visible in [`evals/office-hours/proposed-rules.json`](evals/office-hours/proposed-rules.json):

```diff
- "version": "baseline",
+ "version": "services-excluded",
- "excluded_business_models": [],
+ "excluded_business_models": ["services"],
```

The five input accounts stay the same. The agent's job in the live session was to diagnose the issue and propose this change; the priority calculation itself is deterministic. A same-sample comparison checks the changed behaviour. Fresh examples are needed to validate the rule beyond this sample.

## Run it in your own Cargo workspace

Open this repository in your coding agent and follow [TRY-IT.md](TRY-IT.md). The [official Cargo installation guide](https://api.getcargo.io/INSTALL.md) covers sign-in and the Cargo skills for your agent.

Have the agent confirm your workspace and set up the project state and GitHub connection following the Cargo project skill. Then review the proposed resources and estimated pilot cost in a pull request. Once connected, Cargo plans PRs and deploys approved merges. Import the five fixtures and run the manual play only when you approve the pilot, then read back all five stored results. The template's `cargo.state.json` is an empty placeholder. This repo is not connected to a Cargo workspace, and publishing it does not deploy anything. Your resources belong to your own workspace.

The play is disabled for automatic triggering. All account facts and signals are synthetic. There is no live enrichment, transcript ingestion, outbound messaging, CRM sync or scheduled execution in this example. The presenter's `demo` terminal shortcuts were local helpers; use `npm run demo` for this repository's local preview.

## Checks

```sh
npm run lint
npm run typecheck
npm test
npm run check
```

Open `slides/office-hours.html` locally for the three-slide deck. Arrow keys advance, **F** enters fullscreen, and the final slide contains the attendee prompt.

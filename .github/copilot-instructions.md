# Copilot Instructions

## Purpose

This file defines contributor and automation-agent behavior for this repository.

## Language boundaries (mandatory)

- Keep product requirements in **Romanian (RO)**:
  - `docs/requirements.md`
- Keep contributor, onboarding, and automation instructions in **English (EN)**:
  - `README.md`
  - `CLAUDE.md`
  - `.github/copilot-instructions.md`

Do not mix these language responsibilities unless explicitly requested.

## Product and pedagogy constraints

- The project teaches React incrementally.
- Do not generate or present full final code from the start.
- Each lesson should focus on one concept and include:
  - short explanation,
  - practical example,
  - guided exercise.

## Documentation responsibilities

- `docs/requirements.md` (RO): source of truth for product scope and acceptance criteria.
- `README.md` (EN): project overview, setup, browser rendering model, and onboarding.
- `CLAUDE.md` (EN): contributor and automation conventions.
- `.github/copilot-instructions.md` (EN): operational rules for Copilot-style agents.

## Current project state

- The Vite + React + TypeScript scaffold has been initialized in `react-basics/` using the documented command sequence.
- Keep future changes aligned with the step-based teaching structure already defined in the source layout conventions.
- The first interactive lesson is implemented as `react-basics/src/demos/Counter.tsx` and is rendered from the small shell in `react-basics/src/App.tsx`.

## Agent behavior

- Follow existing repository conventions before introducing new structure.
- Please keep the stylyng low and imporve it only if requested
- Make focused edits only; avoid unrelated refactors.
- Preserve language boundaries.
- If creating automation scripts, document:
  - purpose,
  - inputs,
  - outputs,
  - expected execution environment.

## Contribution workflow

1. Confirm scope against `docs/requirements.md`.
2. Keep changes small and reviewable.
3. Update related documentation when behavior or process changes.
4. If shared instructions change, update `CLAUDE.md` and `.github/copilot-instructions.md` together or through the same sync script.

## Source layout conventions

- Keep each learning concept in its own file under `src/demos/<Concept>.tsx`.
- Keep `App.tsx` short and limited to the shell plus the demo registry.
- The sync script for the shared English instructions is `scripts/sync-instructions.sh`.
- The registry owns the step list, active selection, and rendering of the active demo shell.
- Add a new concept by adding one new demo file and one new entry in the registry.
- Use `src/components/` for shared components across steps.
- Use `src/hooks/` for one custom hook per file.
- Use `src/context/` for a provider and its consumer hook in the same file.
- Use `src/lib/` for small helper functions.
- Keep the root app focused on the registry and active demo only; do not move the default example out of `App.tsx` until the explicit extraction step.

## Demo file rules

- Start every demo file with a header comment in Romanian: `// Pas N — <concept>.`
- Follow the header with comments that explain why the step exists, not just what the code does.
- Keep demo files focused on the lesson content only; the step title comes from the shell in `App.tsx`.
- Keep comments purposeful and concise so the learning path stays readable.

## Step workflow

- Treat every new lesson as a separate step.
- Keep the main app as a growing playground, not a single expanding file.
- Use one commit per step, with a message shaped like `pas 2 — useState (Counter)`.

## Sync scripts

- The process to keep the shared English instructions aligned is: edit `CLAUDE.md` first, then run `scripts/sync-instructions.sh` to regenerate `.github/copilot-instructions.md`.
- If the repository adds shell scripts that synchronize documentation, keep them explicit and easy to run locally.
- Each sync script should document its purpose, inputs, outputs, and expected execution environment.
- The canonical English instructions are `CLAUDE.md` and `.github/copilot-instructions.md`; keep them aligned whenever guidance changes.

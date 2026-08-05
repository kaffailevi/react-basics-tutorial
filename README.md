# react-basics-tutorial

An incremental React learning project for developers who already know programming but are new to JavaScript, React, and the browser rendering model.

## What this project is

This repository defines a step-by-step React playground. It is designed so that each concept is introduced in isolation, explained clearly, and then applied in a small lesson-sized file.

The core rule is simple: **do not dump the full app at the beginning**. Each step should help the learner answer two questions:

- what is this React concept for?
- where does this piece of code live in the project?

## Who this is for

Developers coming from Python, Java, C#, Kotlin, C++, or similar languages who already understand programming but are new to React and modern front-end structure.

## Learning model

Each lesson should contain:

- a short explanation,
- one practical example,
- one small exercise.

The app grows step by step. New concepts belong in their own demo file, and the main app stays short so the learner can see the project structure without wading through a single giant file.

## Standard setup

The expected stack is Vite + React + TypeScript.

Create the project with:

```bash
npm create vite@latest react-basics -- --template react-ts
npm install
npm run dev
```

No extra UI libraries or styling frameworks are added at the start. The initial goal is to understand the project shape, not to add complexity.

## Files you should understand first

- `index.html`: the HTML entry point. It stays almost empty and mainly provides `<div id="root">`.
- `src/main.tsx`: the JavaScript/TypeScript entry point. This is where React is mounted into `div#root`.
- `src/App.tsx`: the shell of the application. It should stay short and hold the demo registry, not the full content of every lesson.
- `src/index.css`: global CSS for the app.
- `vite.config.ts`: Vite build and dev-server configuration.
- `tsconfig.app.json`: TypeScript settings for browser app code.
- `tsconfig.node.json`: TypeScript settings for Node-based tooling and config files.
- `package.json`: scripts, dependencies, and project metadata.
- `public/`: static files served as-is.

The important mental model is this: React does not ask a server to render a finished page for every request. The browser loads `index.html`, React attaches to the root element, and the DOM is built from JavaScript.

## Documentation policy

- Product requirements stay in Romanian in `docs/requirements.md`.
- Contributor and automation instructions stay in English in `README.md`, `CLAUDE.md`, and `.github/copilot-instructions.md`.
- If shell scripts are used to sync shared instructions, they must be documented clearly: purpose, inputs, outputs, and how to run them.

## Current repository shape

This repository is organized to support a step-based teaching flow:

- `src/demos/` for one file per concept
- `src/components/` for shared components
- `src/hooks/` for one custom hook per file
- `src/context/` for a provider and its consumer hook
- `src/lib/` for small helper functions

The main app is expected to keep a registry of lessons and the currently active lesson, while the lesson files themselves hold only their own content.

## Contributing

1. Read `docs/requirements.md` first.
2. Keep changes small and step-oriented.
3. Keep the documentation files aligned whenever the teaching flow changes.

## Related files

- [Requirements (RO)](docs/requirements.md)
- [Contributor guide (EN)](CLAUDE.md)
- [Copilot instructions (EN)](.github/copilot-instructions.md)

# Korespondenční Mars (scaffold)

This is an initial scaffold for a React + TypeScript + Vite app to track Terraforming Mars game results. It was created from the `ideas/korespondencniMars/description.md` design sketches and implements a simple landing (login), a Scores dashboard and a Submit Game dialog with per-player sub-forms and validation rules.

What’s included:

- Vite + React + TypeScript scaffold
- Login page (local, stubbed)
- Scores page with placeholder charts and a games table
- Submit Game dialog that supports multiple player sub-forms, corporation picker, fields and validation

How to run

1. Install dependencies

```bash
cd C:\__Code\korespondencniMars
npm install
```

2. Start dev server

```bash
npm run dev
```

Notes / next steps

- This is a starting point — backend and persistence are not implemented and must be added (Firebase is mentioned in original notes).
- Corporations are mocked in `src/data/corporations.ts` and display very small colored icons as placeholders.

# Korespondenční Mars (scaffold)

This is an initial scaffold for a React + TypeScript + Vite app to track Terraforming Mars game results. It was created from the `ideas/korespondencniMars/description.md` design sketches and implements a simple landing (login), a Scores dashboard and a Submit Game dialog with per-player sub-forms and validation rules.

What’s included:

- Vite + React + TypeScript scaffold
- Login page (local, stubbed)
- Scores page with placeholder charts and a games table
- Submit Game dialog that supports multiple player sub-forms, corporation picker, fields and validation

## Firebase / environment variables

1. Create a Firebase project at https://console.firebase.google.com/ and enable Authentication (Email/Password) and Firestore.

2. Copy `.env.example` to a new (uncommitted) file named `.env.local` and add your Firebase values there. Example keys the project expects:

```text
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

Note: Vite exposes only variables prefixed with `VITE_` to the client; we use those names intentionally so sensitive values are provided at runtime and not committed.

3. After creating `.env.local` with your values, the app will read the config from `import.meta.env` at runtime (see `src/firebase.ts`).

4. Add users in the Firebase Authentication tab using emails such as `name@mars.local` and set their passwords for local testing.

## How to run

1. Install dependencies

```bash
cd ..\korespondencniMars
npm install
```

2. Start dev server

```bash
npm run dev
```

## Build & deploy to Firebase Hosting (production)

1. Make a production build (Vite -> `dist`)

```cmd
npm run build
```

2. Deploy the built `dist` folder to Firebase Hosting

```cmd
firebase deploy --only hosting
```

Notes:

- `firebase.json` is configured to serve the `dist` folder and rewrites all routes to `index.html` (SPA behaviour).
- After successful deploy the CLI prints the hosting URL(s) — or open the Firebase Console -> Hosting page to view your site domain (example: `https://<your-site>.web.app`).

Notes / next steps

- This is a starting point — backend and persistence are not implemented and must be added (Firebase is mentioned in original notes).
- Corporations are mocked in `src/data/corporations.ts` and display very small colored icons as placeholders.

Code quality and formatting

- ESLint + Prettier are configured for this project. After installing dependencies, you can run:
  - `npm run lint` — run lint checks (fail on warnings by default in CI configuration)
  - `npm run lint:fix` — auto-fix lintable problems
  - `npm run format` — run Prettier to format files

VS Code is configured to format on save and apply ESLint fixes on save. It is recommended to install the Prettier and ESLint extensions.

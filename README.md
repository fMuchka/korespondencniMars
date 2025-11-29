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

## Authentication notes

- This project uses a nickname-first pattern in the UI (users enter a `name`), which maps to an email under the hood (for example `alice@mars.local`) so Firebase Email/Password auth can be used while the app shows a friendly nickname.
- The app UI supports requesting a password reset and changing passwords for logged-in users. The Login page no longer supports creating new users (registration) in this scaffold — user accounts should be created in Firebase Console or using a trusted backend.
- Caveat: if you use a fake/local email domain (for example `@mars.local`) the password reset email cannot actually be delivered. For password reset emails to reach users you must use a real email domain and make sure your Firebase project is configured to send email (or use a server-side flow to generate reset links and deliver them through your own channel).

## Production suggestions

- Note: The app implements a client-side change-password flow that requires the user to enter their current password to reauthenticate before updating their password. This is necessary due to Firebase security rules (recent authentication required for sensitive operations).

## Submit Game (development mode)

When running locally (Vite dev mode) the Submit Game dialog contains a "Mock submit (local only)" checkbox. This is enabled by default in dev and prevents the dialog from making Firestore writes — instead it stores a local copy in localStorage (key `mock-game-local-<ts>`) and invokes the same onSave callback so you can test flows without using your Firebase quota.

In production builds the mock option is hidden and the dialog always writes to Firestore.

## Emulator detection / automatic routing

If you run the Firebase emulators locally (for example with `firebase emulators:start --only auth,firestore`) the app will automatically detect that it's running on localhost during dev and connect the Firebase SDKs to the local emulators. When an emulator is detected the Submit Game dialog defaults to writing to the local emulator rather than using mock mode — this lets you exercise real writes without touching production. You can still toggle Mock submit off/on to test local-only flows.

If you need to override emulator host/port use the Vite env vars `VITE_FIRESTORE_EMULATOR_HOST`, `VITE_FIRESTORE_EMULATOR_PORT`, `VITE_FIREBASE_AUTH_EMULATOR_HOST` and `VITE_FIREBASE_AUTH_EMULATOR_PORT`.

## Developer toolbar & debug viewer

When running in dev, the app shows a small Developer toolbar in the top-right of the header. It includes:

- Emulator badge — visible when the Firebase emulator is detected and in use.
- Global mock submit toggle — sets a global dev setting so Submit Game uses local-only mock saves across dialogs without needing to toggle every time.
- Mock saves button — opens a debug viewer that lists local mock saves (those created by the Submit Game mock mode) and lets you inspect or delete them.

These tools are intentionally dev-only and are hidden in production builds.

## Material UI (MUI) visual upgrade

This project now uses Material UI (MUI) for core UI components and visual improvements. The following packages were added to `package.json`:

- `@mui/material`
- `@mui/icons-material`
- `@emotion/react`
- `@emotion/styled`

After pulling changes, run `npm install` to fetch the new packages before running the dev server.

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

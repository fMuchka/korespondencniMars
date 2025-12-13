# Copilot Instructions: Korespondenční Mars

## Project Overview

React + TypeScript + Vite app for tracking Terraforming Mars correspondence game results. Features Firebase auth (nickname → email mapping), game submission with multi-player forms, and comprehensive test infrastructure (Vitest + Playwright).

## Architecture Patterns

### Firebase Integration (`src/firebase.ts`)
- **Emulator Auto-Detection**: Automatically connects to Firebase emulators when running on `localhost` in dev mode
- **Environment Variables**: All Firebase config via `VITE_*` prefixed env vars (see `.env.example`)
- **Nickname-to-Email Auth**: Users enter nicknames (e.g., `alice`), app converts to `alice@mars.local` for Firebase Email/Password auth
- Emulator ports: Firestore=8080, Auth=9099, UI=4000 (customizable via `VITE_FIRESTORE_EMULATOR_HOST/PORT`, `VITE_FIREBASE_AUTH_EMULATOR_HOST/PORT`)

### Developer Mode Features (`src/dev/`)
- **Mock Submit Mode**: Submit Game dialog can write to localStorage instead of Firestore (dev only)
  - Toggle via checkbox in dialog or global setting via Developer Toolbar
  - Mock saves stored as `mock-game-<timestamp>` in localStorage
- **Developer Toolbar** (`DeveloperToolbar.tsx`): Shows emulator status badge, global mock toggle, and Mock Saves viewer
- **Dev Detection**: `import.meta.env.DEV` — all dev tools hidden in production builds

### State & Data Flow
- **Local State First**: Use `useState` for component-specific state
- **No Global State Library**: Small app, pass props or use Context sparingly
- **Game Submission**: `SubmitGameDialog` → validates → writes to Firestore `games` collection OR localStorage (mock mode)
- **Rankings**: Auto-calculated in `SubmitGameDialog.tsx` via `computeRanks()` based on total scores

## Code Conventions

### Naming (see `__conventions/naming.md`)
| Element | Format | Example |
|---------|--------|---------|
| Files (React components) | PascalCase | `PlayerForm.tsx` |
| Components | PascalCase | `const PlayerForm = () => {...}` |
| Functions/Methods | camelCase | `function calculateTotal() {...}` |
| Hooks | camelCase with `use` prefix | `useFormState` |
| Constants | UPPER_SNAKE_CASE | `MAX_PLAYERS` |
| Directories | kebab-case | `test-utils/` |
| Tests | `.test.ts(x)` suffix | `PlayerForm.test.tsx` |

### Code Style (see `__conventions/code.md`)
- **Functions**: Use `function` declarations for standalone utilities/helpers (NOT arrow style)
- **React Components**: Arrow style (`const MyComponent = () => {...}`)
- **Component Methods**: Arrow style (`const handleClick = () => {...}`)
- **Formatting**: Prettier enforced (semi: true, singleQuote: true, printWidth: 100, tabWidth: 2)
- **Types**: Explicit typing preferred, avoid `any` — use `unknown` if absolutely necessary
- **Tests**: Colocated in `__tests__/` next to components

## Critical Development Workflows

### Running the App
```bash
npm run dev                    # Start Vite dev server (port 5173)
firebase emulators:start --only auth,firestore  # Optional: local Firebase
```

### Testing
```bash
npm run test                   # Vitest watch mode
npm run test:run               # Single run (CI)
npm run test:coverage          # With coverage report
npm run test:e2e               # Playwright E2E tests
npm run test:e2e:ui            # Playwright interactive UI
```
- Unit tests: Vitest with React Testing Library (use `test-utils/` wrapper exports)
- E2E tests: Playwright in `tests/e2e/` (must run `npx playwright install` first time)
- See `TESTING.md` for detailed guide and patterns

### Linting & Formatting
```bash
npm run lint                   # Check (fails on warnings)
npm run lint:fix               # Auto-fix
npm run format                 # Run Prettier
```

### Build & Deploy
```bash
npm run build                  # Vite build → dist/
firebase deploy --only hosting # Deploy to Firebase Hosting
```

## AI Agent Collaboration

### Task Tracking (`ai-specs/project/current_task.md`)
- **SINGLE SOURCE OF TRUTH** for active work
- Update at start AND end of every substantial task
- Never mark feature "Complete" without updating this file

### System Context (`ai-specs/project/system_context.md`)
- Contains tech stack, conventions, and critical rules
- **Greeting Protocol**: Start interactions with "Heso!" to confirm file loaded
- **Command Execution**: USER runs all terminal commands — propose and wait for confirmation

### Workflows (`ai-specs/core/guides/workflows.md`)
- Standard: Agent implements, user reviews
- TDD: User writes tests, agent implements
- Bug Fix: Agent investigates, fixes, adds regression test
- See `ai-specs/README.md` for full collaboration patterns

## Common Patterns & Gotchas

### Firebase Authentication
- **No Registration in UI**: Create users via Firebase Console or backend (auth UI removed from Login page)
- **Password Reset**: Uses Firebase email (won't work with fake `@mars.local` emails — needs real domain)
- **Change Password**: Requires re-authentication with current password (see `ChangePassword.tsx`)

### Material UI (MUI)
- Components: `@mui/material` for UI primitives (Button, TextField, Dialog, etc.)
- Icons: `@mui/icons-material`
- Styling: Emotion (`@emotion/react`, `@emotion/styled`)
- Theme: Custom theme in `src/theme.ts` (work in progress on feature/themeToggle branch)

### Test Utilities (`src/test-utils/`)
- Always import `render`, `screen` from `test-utils` NOT directly from `@testing-library/react`
- Provides Firebase mocks and test providers pre-configured
- Example: `import { render, screen } from '../../test-utils';`

### Key Files to Reference
- `src/firebase.ts` — Firebase config and emulator detection
- `src/components/SubmitGameDialog.tsx` — Game submission flow, validation, mock mode
- `src/dev/devSettings.ts` — Developer mode localStorage settings
- `__conventions/` — Naming and code style rules
- `TESTING.md` — Comprehensive testing guide with examples

## Project Structure
```
src/
  components/          # Reusable components (PlayerForm, DeveloperToolbar, etc.)
  pages/              # Top-level pages (Login, Scores)
  dev/                # Developer-only utilities (hidden in production)
  test-utils/         # Testing utilities and mocks
  data/               # Static data (corporations.ts)
  __mocks__/          # Module mocks for tests
tests/e2e/            # Playwright E2E tests
ai-specs/             # AI agent collaboration specs
  core/               # Universal (reusable across projects)
  project/            # Project-specific (current_task, system_context)
__conventions/        # Code and naming conventions
```

## Before Making Changes

1. Check `ai-specs/project/current_task.md` for active work
2. Review relevant `__conventions/` files for patterns
3. Search existing `src/components/` before creating new ones
4. Run tests after changes: `npm run test:run && npm run test:e2e`
5. Update `current_task.md` when task complete

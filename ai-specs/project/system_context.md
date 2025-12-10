# System Context: Korespondenční Mars

## Tech Stack

- **Framework**: React + TypeScript + Vite
- **Styling**: Vanilla CSS (Variables first) + Material UI (MUI) components
- **Backend/Data**: Firebase (Firestore, Auth)
- **Testing**: Vitest (Unit), Playwright (E2E)

## Convention Shortcuts

- **Naming**: camelCase for vars, PascalCase for components.
- **State**: Prefer local state (useState) or Context for global.
- **File Structure**: Feature-based organization in `src/`.

## Critical Rules

1.  **Zero Hallucinations**: Do not invent imports that don't exist.
2.  **Existing Patterns**: Reuse `src/components/` before making new ones.
3.  **Strict Types**: No `any` without a signed waiver from God.
4.  **Command Execution Protocol**:
    - The USER runs all terminal commands, not the agent.
    - When a command needs to be run, propose it and wait for USER confirmation.
    - After USER confirms they've run the command, verify the expected outcome.
    - If USER denies the command with a reason, adapt the approach accordingly.
    - Do NOT wait for approval to run—wait for confirmation that it WAS run.

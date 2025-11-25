## Code conventions

### TypeScript
- prefer functions instead of arrow style const functions for helpers and utilities (non-specific to any component, usable by anyone)
    -   ```function sum(a, b) {...}```

### React
- prefer arrow style components
    -   ```const MyComponent = (props) => {...}```
- prefer arrow style functions inside components
    -   ```const getLabel = () => ...```
    -   ```const handleClick = () => ...```

### Formatting & Style (codified)

- Use Prettier as the formatting source of truth. Project `.prettierrc` sets:
    - semi: true (keep semicolons)
    - singleQuote: true
    - trailingComma: es5
    - printWidth: 100
    - tabWidth: 2

- ESLint is used for linting + catching real problems (security/bugs/consistency).
- Prefers explicit typing when it improves readability; avoid unnecessary use of `any`.
- Keep console.* usage to a minimum (warnings are allowed for debug/info).

### Best practices

- Small, focused components — a component should do one logical thing.
- Tests should go next to the module they test and use `.test.ts(x)` naming.
- Use descriptive variable and function names.

### How this maps to automation

- Run `npm run lint` to check, `npm run lint:fix` to auto-fix problems.
- Run `npm run format` to run Prettier across source files.


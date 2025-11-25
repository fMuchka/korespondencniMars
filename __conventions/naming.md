## Naming Conventions

| Element | Format | Example |
|---|---|---|
| File names | PascalCase | MyComponent.tsx |
| React Components | PascalCase | MyComponent |
| React Custom Hooks  | camelCase | useFormState |
| Directories | kebab-case | shared-components |
| Classes / Types | PascalCase | UserProfile |
| Functions / Methods | camelCase | fetchUserData() |
| Constants | UPPER_SNAKE_CASE | MAX_RETRIES |

Additional notes:
- Test files: use `.test.ts` / `.test.tsx` suffixes and place near the module tested.
- Custom hooks: start with `use` and use camelCase (e.g. `useFormState`).
- Files exporting React components should be PascalCase and named the same as the component.
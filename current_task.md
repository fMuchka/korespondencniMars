# Theme Toggle Feature: Light/Dark Mode

**Type:** Feature
**Status:** In Progress
**Started:** 2025-12-13
**Workflow:** Test-Driven Development (TDD)

## Overview

Add a theme toggle button that switches between light and dark mode. User preference persists in localStorage across sessions. Toggle accessible from AppBar.

## Implementation Plan

### 1. Extend Theme System (`src/theme.ts`)

- Create two theme variants: `lightTheme` and `darkTheme` using MUI's `createTheme`
- Export factory function `getTheme(mode: 'light' | 'dark')` that returns appropriate theme
- Define color palettes for both modes (primary, secondary, background, text)

### 2. Create Theme Storage Utility (`src/utils/themeSettings.ts`)

- Similar pattern to `devSettings.ts` but for user-facing preferences
- Functions:
  - `getThemeMode(): 'light' | 'dark'` - retrieve from localStorage, default to 'light'
  - `setThemeMode(mode: 'light' | 'dark'): void` - persist to localStorage
  - `toggleThemeMode(): 'light' | 'dark'` - switch and return new mode
- localStorage key: `'user.themeMode'`

### 3. Create Theme Toggle Component (`src/components/ThemeToggle.tsx`)

- Icon button component displaying current theme state
- Use `@mui/icons-material/Brightness4` (moon) or `@mui/icons-material/Brightness7` (sun)
- Props: `onToggle: (mode: 'light' | 'dark') => void` callback
- Accessible tooltip: "Switch to dark/light mode"

### 4. Update App Root (`src/App.tsx`)

- Add state: `const [themeMode, setThemeMode] = useState<'light' | 'dark'>(() => getThemeMode())`
- Pass `onToggle` handler to `ThemeToggle` component
- On toggle: update state + call `setThemeMode()` to persist
- Position toggle button in AppBar (before DeveloperToolbar)

### 5. Update Theme Provider (`src/main.tsx`)

- Move `ThemeProvider` logic into `App.tsx` (theme depends on app state)
- Pass dynamic theme based on current mode: `theme={getTheme(themeMode)}`

### 6. Testing Strategy

**Unit Tests (Tester Agent):**

- `src/utils/__tests__/themeSettings.test.ts` - test localStorage read/write/toggle
- `src/components/__tests__/ThemeToggle.test.tsx` - test button renders, click triggers callback
- `src/components/__tests__/App.test.tsx` - verify theme state initialization from localStorage

**E2E Tests (Tester Agent):**

- `tests/e2e/theme-toggle.spec.ts`:
  - Login, toggle theme, verify UI color changes (AppBar background)
  - Refresh page, verify theme persists
  - Toggle back, verify localStorage updated

### 7. Documentation Updates

- Update `README.md` - add feature to list
- Update `.github/copilot-instructions.md` - document theme system architecture

## Technical Decisions

**localStorage Choice:**

- ✅ No Firebase quota/cost concerns
- ✅ Instant read/write, no network delay
- ✅ Simpler implementation
- ✅ Standard pattern for UI preferences
- ⚠️ Caveat: Preference doesn't sync across devices (acceptable)

**Architecture:**

- Keep state in `App.tsx` initially (simple, minimal prop drilling)
- Avoid Context API overkill for single toggle use case

## Acceptance Criteria

- [ ] User can click theme toggle button in AppBar
- [ ] UI switches between light and dark mode immediately
- [ ] Theme preference persists in localStorage
- [ ] On app reload/login, last selected theme is applied
- [ ] Toggle button icon reflects current theme (sun for light, moon for dark)
- [ ] All components respect theme (MUI's `CssBaseline` handles most)
- [ ] Unit tests cover theme utilities and component
- [ ] E2E test verifies persistence across page reloads
- [ ] No console errors or warnings related to theme switching

## Files to Create

- `src/utils/themeSettings.ts`
- `src/components/ThemeToggle.tsx`
- `src/utils/__tests__/themeSettings.test.ts`
- `src/components/__tests__/ThemeToggle.test.tsx`
- `tests/e2e/theme-toggle.spec.ts`

## Files to Modify

- `src/theme.ts` - expand to support light/dark variants
- `src/App.tsx` - add theme state and toggle button
- `src/main.tsx` - adjust ThemeProvider setup
- `README.md` - document new feature
- `.github/copilot-instructions.md` - update architecture section

## TDD Workflow

1. **Tester Agent**: Write unit tests for `themeSettings.ts` utility
2. **Coder/User**: Implement `themeSettings.ts` to pass tests
3. **Tester Agent**: Write unit tests for `ThemeToggle.tsx` component
4. **Coder/User**: Implement `ThemeToggle.tsx` to pass tests
5. **Tester Agent**: Write tests for theme integration in `App.tsx`
6. **Coder/User**: Update `theme.ts`, `App.tsx`, and `main.tsx`
7. **Tester Agent**: Write E2E tests for full theme toggle flow
8. **Coder/User**: Verify all tests pass, update documentation

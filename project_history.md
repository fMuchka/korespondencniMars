# Project History Log

> **Purpose**: Searchable log of features, decisions, and milestones. Use feature IDs for easy lookup.
> **When to update**: When merging PRs or completing significant work.

---

## 2025-11-25 | FEAT-001 | Project Initialization

- **Feature**: Created korespondencniMars - Terraforming Mars score tracking app
- **Status**: ✅ Complete
- **Branch**: `main`
- **Notes**: React + TypeScript + Vite setup with Firebase integration, code quality tooling (ESLint, Prettier)

---

## 2025-11-22 | FEAT-002 | Firebase Configuration Security

- **Feature**: Moved Firebase config to environment variables
- **Status**: ✅ Complete
- **Decisions**:
  - Use `.env` for local development to prevent credentials in git
  - Keep `.env.example` in repo as template
- **Notes**: Improved security by hiding API keys from version control

---

## 2025-11-29 | FEAT-003 | Material UI Migration

- **Feature**: Upgraded UI to Material UI with theme support
- **Status**: ✅ Complete
- **Decisions**:
  - Chose MUI for consistent, professional component library
  - Integrated custom icons for corporations
- **Notes**: Major UI overhaul for better UX and maintainability

---

## 2025-11-29 | FEAT-004 | Database Mocking System

- **Feature**: Implemented Firebase database mocking for development
- **Status**: ✅ Complete
- **Decisions**:
  - Mock data for offline development
  - Easier testing without live Firebase connection
- **Notes**: Improved developer experience

---

## 2025-12-06 | FEAT-005 | Enhanced Player Forms

- **Feature**: Added field-level validation and auto-calculation to player forms
- **Status**: ✅ Complete
- **Decisions**:
  - Real-time validation for better UX
  - Auto-calculate scores based on input
- **Notes**: Reduced user errors and improved data quality

---

## 2025-12-06 | FEAT-006 | Corporation Selection UI

- **Feature**: Enhanced corporation selection with improved UI and data
- **Status**: ✅ Complete
- **Notes**: Better visual representation of corporations with colors and icons

---

## 2025-12-06 | FEAT-007 | Scores Table Improvements

- **Feature**: Improved Scores table to show all players with corporation colors
- **Status**: ✅ Complete
- **Notes**: Enhanced readability and visual appeal of results

---

## 2025-12-07 | FEAT-008 | Data Visualization

- **Feature**: Added placements distribution chart and score visualizations
- **Status**: ✅ Complete
- **Decisions**:
  - Charts for better insights into game statistics
  - Real-time updates on score submission
- **Notes**: Added labels to charts for clarity

---

## 2025-12-07 | FEAT-009 | Testing Infrastructure

- **Feature**: Set up comprehensive testing framework with Vitest and Playwright
- **Status**: ✅ Complete
- **Duration**: 2025-12-07 to 2025-12-09
- **Decisions**:
  - Chose Vitest over Jest for better Vite compatibility
  - Playwright for cross-browser E2E testing
  - Colocated test files for better organization
- **Notes**: All tests passing (3 unit, 12 E2E across 3 browsers). Created `TESTING.md` documentation

---

## 2025-12-09 | FEAT-010 | AI Agent Development Framework

- **Feature**: Created comprehensive AI agent specifications and workflows
- **Status**: ✅ Complete
- **Decisions**:
  - Defined 5 agent roles (Liaison, Coordinator, Maker, QA Buddy, Quality Lead)
  - Created workflow examples (TDD, pair programming, bug fixing, etc.)
  - Documented collaboration patterns
- **Notes**: Framework for AI-assisted development in `ai-specs/` directory

---

## 2025-12-10 | FEAT-011 | AI Specs Reorganization

- **Feature**: Restructured AI specs into portable core/project architecture
- **Status**: ✅ Complete
- **Decisions**:
  - Separated universal files (`core/`) from project-specific (`project/`)
  - Added Project Context Protocol for multi-project portability
  - Created reusable templates
- **Notes**: Framework now portable to any future project

---

## 2025-12-10 | FEAT-012 | Initial Test Coverage

- **Feature**: Add Tests to the App
- **Status**: ✅ Complete
- **Decisions**:
  - Added initial tests
  - Code coverage 67.5% (statements: +67%, functions: +72%, branches: +65%)
- **Notes**: All E2E tests passing. Validated "Strict Types" compliance.

---

## 2025-12-13 | FEAT-013 | Theme Toggle: Light/Dark Mode

- **Feature**: User-switchable light/dark theme with persistent preference storage
- **Status**: ✅ Complete
- **Branch**: `feature/themeToggle`
- **Workflow**: Test-Driven Development (TDD)
- **Decisions**:
  - Use localStorage for theme preference (avoid Firebase quota/cost)
  - Keep state in `App.tsx` rather than Context API (simple use case)
  - MUI theme variants with distinct color palettes for light/dark modes
  - Icon button in AppBar with sun/moon icons for visual feedback
- **Implementation**:
  - Created `themeSettings.ts` utility for localStorage management
  - Created `ThemeToggle.tsx` component with accessible tooltip
  - Extended `theme.ts` with `getTheme(mode)` factory function
  - Integrated theme state into `App.tsx` and `main.tsx`
- **Testing**:
  - Unit tests for theme utilities and component
  - E2E test for theme persistence across page reloads
  - All acceptance criteria verified
- **Notes**: Theme preference doesn't sync across devices (localStorage limitation, acceptable trade-off)

---

## Template Entry (Copy Below)

```markdown
## YYYY-MM-DD | FEAT-XXX | Feature Name

- **Feature**: Brief description of what was built
- **Status**: 🔄 In Progress | ✅ Complete | ⚠️ Blocked | ❌ Cancelled
- **Branch**: `feature/branch-name` (if applicable)
- **PR**: #123 (if applicable)
- **Duration**: YYYY-MM-DD to YYYY-MM-DD (optional)
- **Decisions**:
  - Key decision 1 and rationale
  - Key decision 2 and rationale
- **Notes**: Outcomes, gotchas, or important context
```

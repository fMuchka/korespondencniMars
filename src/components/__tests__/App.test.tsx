import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import * as themeSettings from '../../utils/themeSettings';

// Mock Firebase
vi.mock('../../firebase', () => ({
  auth: {},
  db: {},
}));

// Mock child components to isolate App theme logic
vi.mock('../../pages/Login', () => ({
  default: ({ onLogin }: { onLogin: (name: string) => void }) => (
    <div data-testid="login-page">
      <button onClick={() => onLogin('TestUser')}>Login</button>
    </div>
  ),
}));

vi.mock('../../pages/Scores', () => ({
  default: () => <div data-testid="scores-page">Scores</div>,
}));

vi.mock('../../components/SubmitGameDialog', () => ({
  default: () => <div>Submit Dialog</div>,
}));

vi.mock('../../components/ChangePassword', () => ({
  default: () => <div>Change Password</div>,
}));

vi.mock('../../components/DeveloperToolbar', () => ({
  default: () => <div>Dev Toolbar</div>,
}));

vi.mock('../../components/ThemeToggle', () => ({
  ThemeToggle: ({
    mode,
    onToggle,
  }: {
    mode: 'light' | 'dark';
    onToggle: (newMode: 'light' | 'dark') => void;
  }) => (
    <button
      data-testid="theme-toggle"
      data-mode={mode}
      onClick={() => onToggle(mode === 'light' ? 'dark' : 'light')}
      aria-label={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      Theme: {mode}
    </button>
  ),
}));

describe('App - Theme Integration', () => {
  // Mock localStorage
  const localStorageMock = (() => {
    let store: Record<string, string> = {};

    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value.toString();
      },
      clear: () => {
        store = {};
      },
      removeItem: (key: string) => {
        delete store[key];
      },
    };
  })();

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  describe('theme state initialization', () => {
    it('should initialize with light theme when localStorage is empty', async () => {
      const user = userEvent.setup();
      render(<App />);

      // Login first
      const loginButton = screen.getByText('Login');
      await user.click(loginButton);

      await waitFor(() => {
        const themeToggle = screen.getByTestId('theme-toggle');
        expect(themeToggle).toHaveAttribute('data-mode', 'light');
      });
    });

    it('should initialize with dark theme when localStorage has dark mode', async () => {
      localStorage.setItem('user.themeMode', 'dark');
      const user = userEvent.setup();
      render(<App />);

      // Login first
      const loginButton = screen.getByText('Login');
      await user.click(loginButton);

      await waitFor(() => {
        const themeToggle = screen.getByTestId('theme-toggle');
        expect(themeToggle).toHaveAttribute('data-mode', 'dark');
      });
    });

    it('should initialize with light theme when localStorage has light mode', async () => {
      localStorage.setItem('user.themeMode', 'light');
      const user = userEvent.setup();
      render(<App />);

      // Login first
      const loginButton = screen.getByText('Login');
      await user.click(loginButton);

      await waitFor(() => {
        const themeToggle = screen.getByTestId('theme-toggle');
        expect(themeToggle).toHaveAttribute('data-mode', 'light');
      });
    });

    it('should default to light theme for invalid localStorage values', async () => {
      localStorage.setItem('user.themeMode', 'invalid-value');
      const user = userEvent.setup();
      render(<App />);

      // Login first
      const loginButton = screen.getByText('Login');
      await user.click(loginButton);

      await waitFor(() => {
        const themeToggle = screen.getByTestId('theme-toggle');
        expect(themeToggle).toHaveAttribute('data-mode', 'light');
      });
    });
  });

  describe('theme toggle functionality', () => {
    it('should update theme state when toggle is clicked', async () => {
      const user = userEvent.setup();
      render(<App />);

      // Login first
      const loginButton = screen.getByText('Login');
      await user.click(loginButton);

      await waitFor(() => {
        expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
      });

      const themeToggle = screen.getByTestId('theme-toggle');
      expect(themeToggle).toHaveAttribute('data-mode', 'light');

      // Click to toggle to dark
      await user.click(themeToggle);

      await waitFor(() => {
        expect(themeToggle).toHaveAttribute('data-mode', 'dark');
      });
    });

    it('should persist theme to localStorage when toggled', async () => {
      const user = userEvent.setup();
      render(<App />);

      // Login first
      const loginButton = screen.getByText('Login');
      await user.click(loginButton);

      await waitFor(() => {
        expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
      });

      const themeToggle = screen.getByTestId('theme-toggle');

      // Toggle to dark
      await user.click(themeToggle);

      await waitFor(() => {
        expect(localStorage.getItem('user.themeMode')).toBe('dark');
      });
    });

    it('should toggle multiple times correctly', async () => {
      const user = userEvent.setup();
      render(<App />);

      // Login first
      const loginButton = screen.getByText('Login');
      await user.click(loginButton);

      await waitFor(() => {
        expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
      });

      const themeToggle = screen.getByTestId('theme-toggle');

      // Initial: light
      expect(themeToggle).toHaveAttribute('data-mode', 'light');

      // Toggle 1: light -> dark
      await user.click(themeToggle);
      await waitFor(() => {
        expect(themeToggle).toHaveAttribute('data-mode', 'dark');
      });

      // Toggle 2: dark -> light
      await user.click(themeToggle);
      await waitFor(() => {
        expect(themeToggle).toHaveAttribute('data-mode', 'light');
      });

      // Toggle 3: light -> dark
      await user.click(themeToggle);
      await waitFor(() => {
        expect(themeToggle).toHaveAttribute('data-mode', 'dark');
      });
    });
  });

  describe('theme persistence across sessions', () => {
    it('should preserve dark theme on component remount', async () => {
      localStorage.setItem('user.themeMode', 'dark');
      const user = userEvent.setup();

      const { unmount } = render(<App />);

      // Login
      const loginButton = screen.getByText('Login');
      await user.click(loginButton);

      await waitFor(() => {
        const themeToggle = screen.getByTestId('theme-toggle');
        expect(themeToggle).toHaveAttribute('data-mode', 'dark');
      });

      unmount();

      // Remount app
      render(<App />);
      const loginButton2 = screen.getByText('Login');
      await user.click(loginButton2);

      await waitFor(() => {
        const themeToggle = screen.getByTestId('theme-toggle');
        expect(themeToggle).toHaveAttribute('data-mode', 'dark');
      });
    });

    it('should maintain theme choice after toggling and remounting', async () => {
      const user = userEvent.setup();

      const { unmount } = render(<App />);

      // Login
      const loginButton = screen.getByText('Login');
      await user.click(loginButton);

      await waitFor(() => {
        expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
      });

      // Toggle to dark
      const themeToggle = screen.getByTestId('theme-toggle');
      await user.click(themeToggle);

      await waitFor(() => {
        expect(themeToggle).toHaveAttribute('data-mode', 'dark');
      });

      unmount();

      // Remount and verify dark theme persisted
      render(<App />);
      const loginButton2 = screen.getByText('Login');
      await user.click(loginButton2);

      await waitFor(() => {
        const newThemeToggle = screen.getByTestId('theme-toggle');
        expect(newThemeToggle).toHaveAttribute('data-mode', 'dark');
      });
    });
  });

  describe('theme integration with other features', () => {
    it('should maintain theme state when navigating app features', async () => {
      const user = userEvent.setup();
      render(<App />);

      // Login
      const loginButton = screen.getByText('Login');
      await user.click(loginButton);

      await waitFor(() => {
        expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
      });

      // Toggle to dark
      const themeToggle = screen.getByTestId('theme-toggle');
      await user.click(themeToggle);

      await waitFor(() => {
        expect(themeToggle).toHaveAttribute('data-mode', 'dark');
      });

      // Interact with other features (submit game button)
      const submitButton = screen.getByText('Submit Game');
      await user.click(submitButton);

      // Theme should still be dark
      expect(themeToggle).toHaveAttribute('data-mode', 'dark');
    });

    it('should not lose theme when opening/closing dialogs', async () => {
      const user = userEvent.setup();
      render(<App />);

      // Login
      const loginButton = screen.getByText('Login');
      await user.click(loginButton);

      await waitFor(() => {
        expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
      });

      // Set dark theme
      const themeToggle = screen.getByTestId('theme-toggle');
      await user.click(themeToggle);

      await waitFor(() => {
        expect(themeToggle).toHaveAttribute('data-mode', 'dark');
      });

      // Open change password dialog
      const accountButton = screen.getByText('Account');
      await user.click(accountButton);

      // Theme should persist
      expect(themeToggle).toHaveAttribute('data-mode', 'dark');
      expect(localStorage.getItem('user.themeMode')).toBe('dark');
    });
  });
});

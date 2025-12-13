import { describe, it, expect, beforeEach } from 'vitest';
import { getThemeMode, setThemeMode, THEME_MODE_KEY, toggleThemeMode } from '../themeSettings';

describe('themeSettings', () => {
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
    // Replace global localStorage with our mock
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
    localStorageMock.clear();
  });

  describe('getThemeMode', () => {
    it('should return "light" by default when localStorage is empty', () => {
      expect(getThemeMode()).toBe('light');
    });

    it('should return "dark" when localStorage has dark mode set', () => {
      localStorage.setItem(THEME_MODE_KEY, 'dark');
      expect(getThemeMode()).toBe('dark');
    });

    it('should return "light" when localStorage has light mode set', () => {
      localStorage.setItem(THEME_MODE_KEY, 'light');
      expect(getThemeMode()).toBe('light');
    });

    it('should return "light" for invalid values in localStorage', () => {
      localStorage.setItem(THEME_MODE_KEY, 'invalid');
      expect(getThemeMode()).toBe('light');
    });

    it('should return "light" for empty string in localStorage', () => {
      localStorage.setItem(THEME_MODE_KEY, '');
      expect(getThemeMode()).toBe('light');
    });
  });

  describe('setThemeMode', () => {
    it('should persist "light" mode to localStorage', () => {
      setThemeMode('light');
      expect(localStorage.getItem(THEME_MODE_KEY)).toBe('light');
    });

    it('should persist "dark" mode to localStorage', () => {
      setThemeMode('dark');
      expect(localStorage.getItem(THEME_MODE_KEY)).toBe('dark');
    });

    it('should overwrite existing theme mode', () => {
      setThemeMode('light');
      expect(localStorage.getItem(THEME_MODE_KEY)).toBe('light');

      setThemeMode('dark');
      expect(localStorage.getItem(THEME_MODE_KEY)).toBe('dark');
    });
  });

  describe('toggleThemeMode', () => {
    it('should toggle from light to dark', () => {
      localStorage.setItem(THEME_MODE_KEY, 'light');
      const result = toggleThemeMode();

      expect(result).toBe('dark');
      expect(localStorage.getItem(THEME_MODE_KEY)).toBe('dark');
    });

    it('should toggle from dark to light', () => {
      localStorage.setItem(THEME_MODE_KEY, 'dark');
      const result = toggleThemeMode();

      expect(result).toBe('light');
      expect(localStorage.getItem(THEME_MODE_KEY)).toBe('light');
    });

    it('should toggle to dark when no theme is set (defaults to light)', () => {
      const result = toggleThemeMode();

      expect(result).toBe('dark');
      expect(localStorage.getItem(THEME_MODE_KEY)).toBe('dark');
    });

    it('should toggle multiple times correctly', () => {
      const result1 = toggleThemeMode(); // light -> dark
      expect(result1).toBe('dark');

      const result2 = toggleThemeMode(); // dark -> light
      expect(result2).toBe('light');

      const result3 = toggleThemeMode(); // light -> dark
      expect(result3).toBe('dark');
    });

    it('should handle invalid stored values by defaulting to light then toggling to dark', () => {
      localStorage.setItem(THEME_MODE_KEY, 'invalid');
      const result = toggleThemeMode();

      expect(result).toBe('dark');
      expect(localStorage.getItem(THEME_MODE_KEY)).toBe('dark');
    });
  });

  describe('localStorage key consistency', () => {
    it(`should use ${THEME_MODE_KEY} as the storage key`, () => {
      setThemeMode('dark');
      expect(localStorage.getItem(THEME_MODE_KEY)).toBe('dark');

      // Verify it's not using a different key
      expect(localStorage.getItem('themeMode')).toBeNull();
      expect(localStorage.getItem('theme')).toBeNull();
    });
  });
});

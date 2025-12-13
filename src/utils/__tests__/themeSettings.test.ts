import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getThemeMode, setThemeMode, toggleThemeMode } from '../themeSettings';

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
      localStorage.setItem('user.themeMode', 'dark');
      expect(getThemeMode()).toBe('dark');
    });

    it('should return "light" when localStorage has light mode set', () => {
      localStorage.setItem('user.themeMode', 'light');
      expect(getThemeMode()).toBe('light');
    });

    it('should return "light" for invalid values in localStorage', () => {
      localStorage.setItem('user.themeMode', 'invalid');
      expect(getThemeMode()).toBe('light');
    });

    it('should return "light" for empty string in localStorage', () => {
      localStorage.setItem('user.themeMode', '');
      expect(getThemeMode()).toBe('light');
    });
  });

  describe('setThemeMode', () => {
    it('should persist "light" mode to localStorage', () => {
      setThemeMode('light');
      expect(localStorage.getItem('user.themeMode')).toBe('light');
    });

    it('should persist "dark" mode to localStorage', () => {
      setThemeMode('dark');
      expect(localStorage.getItem('user.themeMode')).toBe('dark');
    });

    it('should overwrite existing theme mode', () => {
      setThemeMode('light');
      expect(localStorage.getItem('user.themeMode')).toBe('light');
      
      setThemeMode('dark');
      expect(localStorage.getItem('user.themeMode')).toBe('dark');
    });
  });

  describe('toggleThemeMode', () => {
    it('should toggle from light to dark', () => {
      localStorage.setItem('user.themeMode', 'light');
      const result = toggleThemeMode();
      
      expect(result).toBe('dark');
      expect(localStorage.getItem('user.themeMode')).toBe('dark');
    });

    it('should toggle from dark to light', () => {
      localStorage.setItem('user.themeMode', 'dark');
      const result = toggleThemeMode();
      
      expect(result).toBe('light');
      expect(localStorage.getItem('user.themeMode')).toBe('light');
    });

    it('should toggle to dark when no theme is set (defaults to light)', () => {
      const result = toggleThemeMode();
      
      expect(result).toBe('dark');
      expect(localStorage.getItem('user.themeMode')).toBe('dark');
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
      localStorage.setItem('user.themeMode', 'invalid');
      const result = toggleThemeMode();
      
      expect(result).toBe('dark');
      expect(localStorage.getItem('user.themeMode')).toBe('dark');
    });
  });

  describe('localStorage key consistency', () => {
    it('should use "user.themeMode" as the storage key', () => {
      setThemeMode('dark');
      expect(localStorage.getItem('user.themeMode')).toBe('dark');
      
      // Verify it's not using a different key
      expect(localStorage.getItem('themeMode')).toBeNull();
      expect(localStorage.getItem('theme')).toBeNull();
    });
  });
});

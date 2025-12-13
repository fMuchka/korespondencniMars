/**
 * Theme settings utility module for managing light and dark theme modes.
 * Provides functions to get, set, and toggle theme preferences stored in localStorage.
 *
 * @module ThemeSettings
 */

/**
 * Key used to store and retrieve current theme mode
 */
export const THEME_MODE_KEY = 'KM-THEME-VALUE';

/**
 * Represents the available theme modes.
 */
export type ThemeMode = 'light' | 'dark';

/**
 * Retrieves the current theme mode from localStorage.
 * Defaults to 'light' if no valid theme is stored.
 *
 * @returns {ThemeMode} The current theme mode ('light' or 'dark')
 */
export const getThemeMode = (): ThemeMode => {
  const currentValue = localStorage.getItem(THEME_MODE_KEY);

  if (currentValue === 'dark') {
    return 'dark';
  } else {
    return 'light';
  }
};

/**
 * Saves the specified theme mode to localStorage.
 *
 * @param {ThemeMode} theme - The theme mode to save ('light' or 'dark')
 * @returns {void}
 */
export const setThemeMode = (theme: ThemeMode): void => {
  localStorage.setItem(THEME_MODE_KEY, theme);
};

/**
 * Toggles between light and dark theme modes.
 * Retrieves the current mode, switches to the opposite mode, saves it, and returns the new mode.
 *
 * @returns {ThemeMode} The newly set theme mode after toggling
 */
export const toggleThemeMode = (): ThemeMode => {
  const currentMode = getThemeMode();
  const newMode = currentMode === 'dark' ? 'light' : 'dark';

  setThemeMode(newMode);

  return newMode;
};

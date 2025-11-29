/**
 * Simple developer settings stored in localStorage.
 * Used only in dev mode to configure mock behaviour and debug tools.
 */

const USE_MOCK_KEY = 'dev.useMockSubmit';

export function getUseMockSubmit(): boolean | null {
  try {
    const v = localStorage.getItem(USE_MOCK_KEY);
    if (v === null) return null;
    return v === 'true';
  } catch (e) {
    return null;
  }
}

export function setUseMockSubmit(val: boolean | null) {
  try {
    if (val === null) {
      localStorage.removeItem(USE_MOCK_KEY);
    } else {
      localStorage.setItem(USE_MOCK_KEY, val ? 'true' : 'false');
    }
  } catch (e) {
    // ignore
  }
}

export function toggleUseMockSubmit() {
  const cur = getUseMockSubmit();
  setUseMockSubmit(!(cur === true));
}

export function isDevEnabled() {
  return Boolean(import.meta.env.DEV);
}

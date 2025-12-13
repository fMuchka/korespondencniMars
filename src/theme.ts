// Use the styles-specific entry which reliably exports createTheme in all bundlers.

import { createTheme } from '@mui/material';
import { ThemeMode } from './utils/themeSettings';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ff9800',
    },
  },
  typography: {
    fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#155697ff',
    },
    secondary: {
      main: '#b16a00ff',
    },
  },
  typography: {
    fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
  },
});

export const getTheme = (mode: ThemeMode) => {
  if (mode === 'dark') return darkTheme;
  return lightTheme;
};

export default lightTheme;

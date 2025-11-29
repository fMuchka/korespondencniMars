// Use the styles-specific entry which reliably exports createTheme in all bundlers.

import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
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

export default theme;

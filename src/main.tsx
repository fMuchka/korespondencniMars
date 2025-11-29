import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { ThemeProvider } from '@mui/material';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

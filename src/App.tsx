import React, { useState } from 'react';
import Login from './pages/Login';
import Scores from './pages/Scores';
import SubmitGameDialog from './components/SubmitGameDialog';
import ChangePassword from './components/ChangePassword';
import DeveloperToolbar from './components/DeveloperToolbar';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import { getThemeMode, ThemeMode, setThemeMode } from './utils/themeSettings';
import ThemeToggle from './components/ThemeToggle';
import { getTheme } from './theme';

const App: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [changeOpen, setChangeOpen] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(0);

  const [themeModeLocal, setThemeModeLocal] = useState<ThemeMode>(() => getThemeMode());

  const handleThemeToggle = (mode: ThemeMode) => {
    setThemeModeLocal(mode);
    setThemeMode(mode);
  };

  if (!user) {
    return <Login onLogin={(name) => setUser(name)} />;
  }

  return (
    <ThemeProvider theme={getTheme(themeModeLocal)}>
      <CssBaseline />
      <div className="app-root">
        <AppBar position="static" color="primary" sx={{ mb: 2 }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Korespondenční Mars
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ opacity: 0.9, mr: 1 }}>
                You: {user}
              </Typography>
              <Button variant="contained" color="secondary" onClick={() => setDialogOpen(true)}>
                Submit Game
              </Button>
              <ThemeToggle
                mode={themeModeLocal}
                onToggle={(mode) => {
                  handleThemeToggle(mode);
                }}
              />
              <Button variant="outlined" color="inherit" onClick={() => setChangeOpen(true)}>
                Account
              </Button>
              <Button
                variant="text"
                color="inherit"
                onClick={async () => {
                  await signOut(auth);
                  setUser(null);
                }}
              >
                Logout
              </Button>
            </Box>
          </Toolbar>
          <DeveloperToolbar />
        </AppBar>

        <main style={{ padding: '16px' }}>
          <Scores lastUpdate={lastUpdate} />
        </main>

        {dialogOpen && (
          <SubmitGameDialog
            onClose={() => setDialogOpen(false)}
            onSave={() => {
              setDialogOpen(false);
              setLastUpdate((n) => n + 1);
            }}
          />
        )}
        {changeOpen && <ChangePassword onClose={() => setChangeOpen(false)} />}
      </div>
    </ThemeProvider>
  );
};

export default App;

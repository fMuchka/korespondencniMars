import React, { useState } from 'react';
import Login from './pages/Login';
import Scores from './pages/Scores';
import SubmitGameDialog from './components/SubmitGameDialog';
import ChangePassword from './components/ChangePassword';
import DeveloperToolbar from './components/DeveloperToolbar';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';

const App: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [changeOpen, setChangeOpen] = useState(false);

  if (!user) {
    return <Login onLogin={(name) => setUser(name)} />;
  }

  return (
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
            <DeveloperToolbar />
          </Box>
        </Toolbar>
      </AppBar>

      <main style={{ padding: '16px' }}>
        <Scores />
      </main>

      {dialogOpen && (
        <SubmitGameDialog
          onClose={() => setDialogOpen(false)}
          onSave={() => {
            setDialogOpen(false);
          }}
        />
      )}
      {changeOpen && <ChangePassword onClose={() => setChangeOpen(false)} />}
    </div>
  );
};

export default App;

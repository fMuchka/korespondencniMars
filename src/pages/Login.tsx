import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Box, Paper, Typography, TextField, Alert, Button } from '@mui/material';

const Login: React.FC<{ onLogin: (name: string) => void }> = ({
  onLogin,
}: {
  onLogin: (name: string) => void;
}) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [info] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === '' || password.trim() === '') return;
    try {
      // Use email as name@mars.local for Firebase email/password auth
      const email = `${name.trim()}@mars.local`;
      await signInWithEmailAndPassword(auth, email, password);
      onLogin(name.trim());
    } catch (err: unknown) {
      // don't leak internal errors; show a friendly message
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '72vh' }}
    >
      <Paper sx={{ width: 460, p: 4, boxShadow: 3 }}>
        <Typography variant="h5" component="h1" sx={{ mb: 2 }}>
          Login
        </Typography>

        <form onSubmit={submit}>
          <TextField
            label="Nickname"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            autoFocus
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />

          {error && (
            <Alert severity="error" sx={{ my: 1 }}>
              {error}
            </Alert>
          )}

          {info && (
            <Alert severity="info" sx={{ my: 1 }}>
              {info}
            </Alert>
          )}

          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 1 }}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;

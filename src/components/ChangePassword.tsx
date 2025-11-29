import React, { useState } from 'react';
import { auth } from '../firebase';
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  User,
} from 'firebase/auth';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  TextField,
  Alert,
  DialogActions,
  Button,
} from '@mui/material';

const ChangePassword: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);

    if (newPassword.length < 6) {
      setError('New password should be at least 6 characters.');
      return;
    }
    if (newPassword !== confirm) {
      setError('New password and confirmation do not match.');
      return;
    }

    const user = auth.currentUser as User | null;
    if (!user || !user.email) {
      setError('No authenticated user found.');
      return;
    }

    try {
      // Reauthenticate using the user's email and current password
      const cred = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, cred);
      // Update password
      await updatePassword(user, newPassword);
      setInfo('Password updated successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirm('');
    } catch (err: unknown) {
      const e = err as { code?: string; message?: string } | undefined;
      const code = e?.code ?? e?.message ?? '';
      if (code.includes('auth/wrong-password')) {
        setError('Current password is incorrect.');
      } else if (code.includes('auth/weak-password')) {
        setError('New password is too weak. Choose a longer password.');
      } else {
        setError('Unable to change password — try again.');
      }
    }
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Change password</DialogTitle>
      <form onSubmit={submit}>
        <DialogContent dividers>
          <Stack spacing={2}>
            <TextField
              label="Current password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              fullWidth
            />

            <TextField
              label="New password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
            />

            <TextField
              label="Confirm new password"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              fullWidth
            />

            {error && <Alert severity="error">{error}</Alert>}
            {info && <Alert severity="success">{info}</Alert>}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Close</Button>
          <Button type="submit" variant="contained" color="primary">
            Change password
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ChangePassword;

import React, { useState } from 'react';
import { auth } from '../firebase';
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  User,
} from 'firebase/auth';

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
    <div className="dialog-overlay">
      <div className="dialog">
        <h3>Change password</h3>
        <form onSubmit={submit}>
          <label>Current password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <label>New password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <label>Confirm new password</label>
          <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />

          {error && <div className="error">{error}</div>}
          {info && <div className="info">{info}</div>}

          <div className="actions">
            <button type="submit">Change password</button>
            <button type="button" onClick={onClose} className="link">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;

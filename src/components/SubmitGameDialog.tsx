import React, { useState, useEffect } from 'react';
import { db, USE_FIREBASE_EMULATOR } from '../firebase';
import { getUseMockSubmit } from '../dev/devSettings';
import { collection, addDoc } from 'firebase/firestore';
import PlayerForm, { PlayerData } from './PlayerForm';
import {
  Dialog,
  DialogTitle,
  Typography,
  IconButton,
  DialogContent,
  Stack,
  FormControlLabel,
  Checkbox,
  DialogActions,
  Button,
} from '@mui/material';
import { Close, Add } from '@mui/icons-material';

const emptyPlayer = (id: string): PlayerData => ({
  id,
  name: '',
  corporation: '',
  terraformingRating: 1,
  awards: 0,
  milestones: 0,
  greeneries: 0,
  cities: 0,
  victoryPoints: 0,
  total: 0,
  rank: 1,
});

type GameRecord = { id?: string; players: PlayerData[]; createdAt: string; _mock?: boolean };
type SubmitGameDialogProps = { onClose: () => void; onSave: (game: GameRecord) => void };

const SubmitGameDialog: React.FC<SubmitGameDialogProps> = ({ onClose, onSave }) => {
  const [players, setPlayers] = useState<PlayerData[]>([emptyPlayer('p-1')]);
  const [error, setError] = useState<string | null>(null);

  const addPlayer = () => setPlayers((s) => [...s, emptyPlayer(`p-${Date.now()}`)]);
  const removePlayer = (id: string) => setPlayers((s) => s.filter((p) => p.id !== id));

  const updatePlayer = (id: string, p: PlayerData) =>
    setPlayers((s) => s.map((x) => (x.id === id ? p : x)));

  function validate() {
    setError(null);
    if (players.length < 1) {
      setError('Add at least one player');
      return false;
    }

    // unique names
    const names = players.map((p) => p.name.trim()).filter(Boolean);
    if (names.length !== new Set(names).size) {
      setError('Player names must be unique and non-empty');
      return false;
    }

    // totals formula check
    for (const p of players) {
      if (p.terraformingRating < 1) {
        setError(`Terraforming rating for ${p.name || p.id} must be >= 1`);
        return false;
      }
      if (p.awards < 0 || p.awards > 15) {
        setError(`Awards for ${p.name || p.id} must be 0..15`);
        return false;
      }
      if (p.milestones < 0 || p.milestones > 15) {
        setError(`Milestones for ${p.name || p.id} must be 0..15`);
        return false;
      }
      if (p.milestones % 5 !== 0) {
        setError(`Milestones for ${p.name || p.id} must step by 5`);
        return false;
      }
      if (p.greeneries < 0) {
        setError(`Greeneries for ${p.name || p.id} must be >= 0`);
        return false;
      }
      if (p.cities < 0) {
        setError(`Cities for ${p.name || p.id} must be >= 0`);
        return false;
      }
      if (p.victoryPoints < 0) {
        setError(`Victory Points for ${p.name || p.id} must be >= 0`);
        return false;
      }

      const calc =
        p.terraformingRating + p.awards + p.milestones + p.greeneries + p.cities + p.victoryPoints;
      if (p.total !== calc) {
        setError(`Total mismatch for ${p.name || p.id}: expected ${calc}, got ${p.total}`);
        return false;
      }
      if (p.rank < 1 || p.rank > players.length) {
        setError(`Invalid rank for ${p.name || p.id}`);
        return false;
      }
    }

    // ranks unique check
    const ranks = players.map((p) => p.rank);
    if (ranks.length !== new Set(ranks).size) {
      setError('Players cannot share the same rank');
      return false;
    }

    return true;
  }

  const [saving, setSaving] = useState(false);
  // In dev we allow a mock/local submit so developers don't waste write requests.
  // Default to mock/save-local if running in Vite dev mode; in production we always write.
  const isDev = Boolean(import.meta.env.DEV);
  const isEmulator = Boolean(USE_FIREBASE_EMULATOR);

  // Default to mock/save-local in dev, but prefer emulator when it's active so developers can exercise it.
  // Support a global dev setting (localStorage) that overrides the default.
  const globalUseMock = getUseMockSubmit();
  const [useMock, setUseMock] = useState<boolean>(
    globalUseMock !== null ? Boolean(globalUseMock) : isDev && !isEmulator
  );

  // If global dev setting changes elsewhere (DeveloperToolbar), pick it up via storage events
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === 'dev.useMockSubmit') {
        try {
          const val = e.newValue;
          if (val === null) setUseMock(isDev && !isEmulator);
          else setUseMock(val === 'true');
        } catch (err) {
          // ignore
        }
      }
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [isDev, isEmulator]);

  const submit = async () => {
    if (!validate()) return;
    setSaving(true);
    const game = {
      players,
      createdAt: new Date().toISOString(),
    };
    try {
      if (useMock) {
        // Simulate a local save: create a pseudo-id and call onSave without writing to Firestore
        const fakeId = `local-${Date.now()}`;
        // Optionally store a local copy for QA or debugging
        try {
          localStorage.setItem(`mock-game-${fakeId}`, JSON.stringify({ ...game, id: fakeId }));
        } catch (e) {
          // ignore storage issues
        }
        onSave({ ...game, id: fakeId, _mock: true });
      } else {
        const docRef = await addDoc(collection(db, 'games'), game);
        onSave({ ...game, id: docRef.id });
      }
    } catch (err) {
      setError('Failed to save game.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6">Submit Game</Typography>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2}>
          {players.map((p: PlayerData) => (
            <PlayerForm
              key={p.id}
              player={p}
              onChange={(next: PlayerData) => updatePlayer(p.id, next)}
              onRemove={() => removePlayer(p.id)}
              showRemove={players.length > 1}
            />
          ))}
        </Stack>
      </DialogContent>

      {/* Dev-only: allow mocking posts locally so devs don't waste DB writes */}
      {isDev && (
        <div style={{ margin: '8px 0', fontSize: 13, color: '#444' }}>
          {isEmulator ? (
            <Typography variant="body2" color="text.secondary">
              <strong>Firebase emulator detected</strong>
              <span> — writes will go to the local emulator.</span>
            </Typography>
          ) : (
            <Stack direction="row" alignItems="center" spacing={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={useMock}
                    onChange={(_e: React.ChangeEvent<HTMLInputElement>, checked: boolean) =>
                      setUseMock(checked)
                    }
                  />
                }
                label="Mock submit (local only)"
              />
              <Typography variant="body2" color="text.secondary">
                When checked, saves locally — no Firestore writes.
              </Typography>
            </Stack>
          )}
        </div>
      )}

      {error && (
        <DialogContent>
          <Typography color="error">{error}</Typography>
        </DialogContent>
      )}

      <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
        <Button startIcon={<Add />} onClick={addPlayer} color="primary">
          Add player
        </Button>

        <div style={{ display: 'flex', gap: 8 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={submit} variant="contained" color="primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default SubmitGameDialog;

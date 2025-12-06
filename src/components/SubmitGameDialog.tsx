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
  const [fieldErrors, setFieldErrors] = useState<Record<string, Record<string, string>>>({});

  const computeRanks = (items: PlayerData[]) => {
    // assign ranks based on total (descending). Return new array in original order with ranks set.
    const sorted = [...items].sort((a, b) => b.total - a.total);
    const rankById = new Map<string, number>();
    sorted.forEach((pl, idx) => rankById.set(pl.id, idx + 1));
    return items.map((pl) => ({ ...pl, rank: rankById.get(pl.id) ?? pl.rank }));
  };

  const computeTotals = (items: PlayerData[]) =>
    items.map((p) => {
      const calc =
        (Number(p.terraformingRating) || 0) +
        (Number(p.awards) || 0) +
        (Number(p.milestones) || 0) +
        (Number(p.greeneries) || 0) +
        (Number(p.cities) || 0) +
        (Number(p.victoryPoints) || 0);
      return { ...p, total: calc };
    });

  const syncTotalsAndRanks = (items: PlayerData[]) => {
    const withTotals = computeTotals(items);
    const withRanks = computeRanks(withTotals);
    // detect any change in total/rank compared to original items
    const changed = items.some(
      (p, i) => p.total !== withRanks[i].total || p.rank !== withRanks[i].rank
    );
    return changed ? withRanks : items;
  };

  const addPlayer = () =>
    setPlayers((s) => syncTotalsAndRanks([...s, emptyPlayer(`p-${Date.now()}`)]));
  const removePlayer = (id: string) =>
    setPlayers((s) => syncTotalsAndRanks(s.filter((p) => p.id !== id)));

  const updatePlayer = (id: string, p: PlayerData) =>
    setPlayers((s) => syncTotalsAndRanks(s.map((x) => (x.id === id ? p : x))));

  function collectFieldErrors(items: PlayerData[]) {
    const errors: Record<string, Record<string, string>> = {};

    if (items.length < 1) {
      setError('Add at least one player');
    } else {
      setError(null);
    }

    // name uniqueness map
    const nameCounts = items.reduce<Record<string, number>>((acc, p) => {
      const n = p.name.trim();
      if (!n) return acc;
      acc[n] = (acc[n] || 0) + 1;
      return acc;
    }, {});

    // corporation uniqueness map
    const corpCounts = items.reduce<Record<string, number>>((acc, p) => {
      const c = p.corporation?.trim();
      if (!c) return acc;
      acc[c] = (acc[c] || 0) + 1;
      return acc;
    }, {});

    for (const p of items) {
      const e: Record<string, string> = {};
      const name = p.name.trim();
      if (!name) e.name = 'Name is required';
      else if (nameCounts[name] > 1) e.name = 'Name must be unique';

      const corp = p.corporation?.trim();
      if (!corp) e.corporation = 'Corporation is required';
      else if (corpCounts[corp] > 1) e.corporation = 'This corporation is already taken';

      if (p.terraformingRating < 1) e.terraformingRating = 'Terraforming Rating must be >= 1';

      if (p.awards < 0 || p.awards > 15) e.awards = 'Awards must be 0..15';

      if (p.milestones < 0 || p.milestones > 15) e.milestones = 'Milestones must be 0..15';
      else if (p.milestones % 5 !== 0) e.milestones = 'Milestones must step by 5';

      if (p.greeneries < 0) e.greeneries = 'Greeneries must be >= 0';
      if (p.cities < 0) e.cities = 'Cities must be >= 0';
      if (p.victoryPoints < 0) e.victoryPoints = 'Victory Points must be >= 0';

      const calc =
        (Number(p.terraformingRating) || 0) +
        (Number(p.awards) || 0) +
        (Number(p.milestones) || 0) +
        (Number(p.greeneries) || 0) +
        (Number(p.cities) || 0) +
        (Number(p.victoryPoints) || 0);
      if (p.total !== calc) e.total = `Total should be ${calc}`;

      if (p.rank < 1 || p.rank > items.length) e.rank = 'Invalid rank';

      if (Object.keys(e).length > 0) errors[p.id] = e;
    }

    // ranks unique check
    const ranks = items.map((p) => p.rank);
    if (ranks.length !== new Set(ranks).size) {
      const seen = new Map<number, number>();
      for (let i = 0; i < items.length; i++) {
        const r = items[i].rank;
        if (seen.has(r)) {
          errors[items[i].id] = {
            ...(errors[items[i].id] || {}),
            rank: 'Players cannot share the same rank',
          };
          const firstIdx = seen.get(r)!;
          errors[items[firstIdx].id] = {
            ...(errors[items[firstIdx].id] || {}),
            rank: 'Players cannot share the same rank',
          };
        } else seen.set(r, i);
      }
    }

    return errors;
  }

  // Sync totals/ranks and collect field-level validation errors on every change
  useEffect(() => {
    const synced = syncTotalsAndRanks(players);
    if (synced !== players) {
      setPlayers(synced);
      return;
    }
    const errs = collectFieldErrors(players);
    setFieldErrors(errs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [players]);

  const getUnavailableCorporations = (playerId: string) => {
    // return corporation names selected by other players (non-empty)
    return players
      .filter((p) => p.id !== playerId)
      .map((p) => p.corporation?.trim())
      .filter(Boolean) as string[];
  };

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
    // Ensure totals/ranks are synced and there are no field errors before submitting
    const synced = syncTotalsAndRanks(players);
    if (synced !== players) {
      setPlayers(synced);
      return;
    }
    const errs = collectFieldErrors(players);
    setFieldErrors(errs);
    const hasFieldErr = Object.values(errs).some((e) => Object.keys(e).length > 0);
    if (hasFieldErr || error) return;
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
              errors={fieldErrors[p.id]}
              unavailableCorporations={getUnavailableCorporations(p.id)}
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
          <Button
            onClick={submit}
            variant="contained"
            color="primary"
            disabled={
              saving ||
              Boolean(error) ||
              Object.values(fieldErrors).some((e) => Object.keys(e).length > 0)
            }
          >
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default SubmitGameDialog;

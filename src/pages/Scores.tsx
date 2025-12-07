import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import type { ChartData } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Alert,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { db, USE_FIREBASE_EMULATOR } from '../firebase';
import { CORPORATIONS } from '../data/corporations';
import { collection, query, orderBy, onSnapshot, getDocs, DocumentData } from 'firebase/firestore';
import { getUseMockSubmit } from '../dev/devSettings';

type Player = { name: string; corporation: string; rank: number; total?: number };
type GameRecord = { id?: string; players: Player[]; createdAt: string; _mock?: boolean };

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartDataLabels
);

// placeholder left out; charts will be computed from games

// helper for colours used by both charts
const DEFAULT_COLORS = [
  '#4caf50',
  '#2196f3',
  '#ff9800',
  '#e91e63',
  '#9c27b0',
  '#ff5722',
  '#3f51b5',
  '#00bcd4',
  '#8bc34a',
  '#cddc39',
];
const Scores: React.FC<{ lastUpdate?: number }> = ({ lastUpdate = 0 }) => {
  const [games, setGames] = useState<GameRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isDev = Boolean(import.meta.env.DEV);
  const isEmulator = Boolean(USE_FIREBASE_EMULATOR);
  const globalUseMock = getUseMockSubmit();
  const useMock = globalUseMock !== null ? Boolean(globalUseMock) : isDev && !isEmulator;

  useEffect(() => {
    setLoading(true);
    setError(null);

    if (useMock) {
      try {
        const keys: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('mock-game-')) keys.push(key);
        }

        const items = keys
          .map((k) => {
            try {
              const val = localStorage.getItem(k);
              return val ? (JSON.parse(val) as GameRecord) : null;
            } catch {
              return null;
            }
          })
          .filter(Boolean) as GameRecord[];

        items.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
        setGames(items);
      } catch (e) {
        setError('Failed to read mock games');
      } finally {
        setLoading(false);
      }

      return;
    }

    const q = query(collection(db, 'games'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(
      q,
      (snap) => {
        // defensively map Firestore documents to GameRecord with defaults
        const docs = snap.docs.map((d) => {
          const data = d.data() as DocumentData;
          return {
            id: d.id,
            players: (data.players as Player[]) || [],
            createdAt: (data.createdAt as string) || new Date().toISOString(),
            _mock: Boolean(data._mock),
          } as GameRecord;
        });
        setGames(docs);
        setLoading(false);
      },
      (err) => {
        // fallback to one-off fetch
        console.warn('snapshot failed, fallback to getDocs', err);
        getDocs(q)
          .then((s) =>
            setGames(
              s.docs.map((d) => {
                const data = d.data() as DocumentData;
                return {
                  id: d.id,
                  players: (data.players as Player[]) || [],
                  createdAt: (data.createdAt as string) || new Date().toISOString(),
                  _mock: Boolean(data._mock),
                } as GameRecord;
              })
            )
          )
          .catch(() => setError('Failed to load games'))
          .finally(() => setLoading(false));
      }
    );

    return () => unsub();
  }, [useMock, lastUpdate]);

  // derive simple charts: who won most games and which corporations win most
  const playersCount = new Map<string, number>();
  const corpsCount = new Map<string, number>();

  games.forEach((g) => {
    const winner = g.players?.find((p) => p.rank === 1) || g.players?.[0];
    if (!winner) return;
    playersCount.set(winner.name, (playersCount.get(winner.name) || 0) + 1);
    if (winner.corporation) {
      corpsCount.set(winner.corporation, (corpsCount.get(winner.corporation) || 0) + 1);
    }
  });

  const playerLabels = Array.from(playersCount.keys());
  const playerDataArr = Array.from(playersCount.values());
  const playersChart: ChartData<'pie', number[], string> = {
    labels: playerLabels,
    datasets: [
      {
        data: playerDataArr,
        backgroundColor: playerLabels.map((_, i) => DEFAULT_COLORS[i % DEFAULT_COLORS.length]),
      },
    ],
  };

  const corpLabels = Array.from(corpsCount.keys());
  const corpDataArr = Array.from(corpsCount.values());
  const getCorpColor = (corpName: string) => {
    const c = CORPORATIONS.find((x) => x.name === corpName || x.key === corpName);
    return c ? c.color : undefined;
  };

  const corpsChart: ChartData<'bar', number[], string> = {
    labels: corpLabels,
    datasets: [
      {
        label: 'Wins',
        data: corpDataArr.sort((a, b) => b - a),
        backgroundColor: corpLabels.map(
          (label, i) => getCorpColor(label) ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]
        ),
      },
    ],
  };

  // NEW: Calculate placements (1st, 2nd, 3rd) for all players
  const playerPlacements = new Map<string, { 1: number; 2: number; 3: number }>();

  games.forEach((g) => {
    g.players.forEach((p) => {
      // We only care about ranks 1, 2, 3
      if (p.rank && p.rank >= 1 && p.rank <= 3) {
        if (!playerPlacements.has(p.name)) {
          playerPlacements.set(p.name, { 1: 0, 2: 0, 3: 0 });
        }
        const stats = playerPlacements.get(p.name)!;
        stats[p.rank as 1 | 2 | 3]++;
      }
    });
  });

  // Sort by total podium finishes (Gold + Silver + Bronze)
  const placementLabels = Array.from(playerPlacements.keys()).sort((a, b) => {
    const statsA = playerPlacements.get(a)!;
    const statsB = playerPlacements.get(b)!;
    const totalA = statsA[1] * 3 + statsA[2] * 2 + statsA[3] * 1;
    const totalB = statsB[1] * 3 + statsB[2] * 2 + statsB[3] * 1;
    // Sort descending
    return totalB - totalA;
  });

  const placementsChart: ChartData<'bar', number[], string> = {
    labels: placementLabels,
    datasets: [
      {
        label: '1st Place',
        data: placementLabels.map((name) => playerPlacements.get(name)?.[1] || 0),
        backgroundColor: '#FFD700', // Gold
        stack: 'total',
      },
      {
        label: '2nd Place',
        data: placementLabels.map((name) => playerPlacements.get(name)?.[2] || 0),
        backgroundColor: '#C0C0C0', // Silver
        stack: 'total',
      },
      {
        label: '3rd Place',
        data: placementLabels.map((name) => playerPlacements.get(name)?.[3] || 0),
        backgroundColor: '#CD7F32', // Bronze
        stack: 'total',
      },
    ],
  };

  return (
    <Container sx={{ py: 2 }}>
      <Typography variant="h4" gutterBottom>
        Scores dashboard
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Win split — players</Typography>
            <div style={{ height: 240 }}>
              <Pie data={playersChart} />
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Win split — corporations</Typography>
            <div style={{ height: 240 }}>
              <Bar
                data={corpsChart}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: { ticks: { stepSize: 1 } },
                  },
                  plugins: {
                    datalabels: {
                      color: '#000',
                      anchor: 'end',
                      align: 'top',
                      font: { weight: 'bold' },
                    },
                  },
                }}
              />
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Player Placements (1st / 2nd / 3rd)</Typography>
            <div style={{ height: 300 }}>
              <Bar
                data={placementsChart}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: { stacked: true },
                    y: { stacked: true, ticks: { stepSize: 1 } },
                  },
                  plugins: {
                    datalabels: {
                      display: (ctx) => {
                        return (ctx.dataset.data[ctx.dataIndex] as number) > 0;
                      },
                      color: '#fff',
                      font: { weight: 'bold', size: 10 },
                    },
                  },
                }}
              />
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Games
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Game</TableCell>
                    <TableCell>Player</TableCell>
                    <TableCell>Corp</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Rank</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading && (
                    <TableRow>
                      <TableCell colSpan={5}>Loading…</TableCell>
                    </TableRow>
                  )}

                  {!loading && games.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5}>No games found.</TableCell>
                    </TableRow>
                  )}

                  {!loading &&
                    games.map((g) => {
                      const players = [...(g.players || [])].sort(
                        (a, b) =>
                          (a.rank ?? Number.MAX_SAFE_INTEGER) - (b.rank ?? Number.MAX_SAFE_INTEGER)
                      );
                      return players.map((p, i) => (
                        <TableRow
                          key={`${g.id ?? 'local'}-${i}`}
                          sx={
                            p.rank === 1
                              ? { backgroundColor: 'rgba(88, 130, 207, 0.37)' }
                              : undefined
                          }
                        >
                          <TableCell key={`${'game id'}-${i}`}>
                            {i === 0 ? (g.id ?? 'local') : ''}
                          </TableCell>
                          <TableCell key={`${'name'}-${i}`}>{p.name ?? '—'}</TableCell>
                          <TableCell key={`${'corporation'}-${i}`}>
                            {p.corporation ?? '—'}
                          </TableCell>
                          <TableCell key={`${'total'}-${i}`}>{p.total ?? '—'}</TableCell>
                          <TableCell key={`${'rank'}-${i}`}>{p.rank ?? '—'}</TableCell>
                        </TableRow>
                      ));
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Scores;

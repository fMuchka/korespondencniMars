import React from 'react';
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
import {
  Container,
  Typography,
  Grid,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const samplePlayers = {
  labels: ['Alice', 'Bob', 'Charlie'],
  datasets: [{ data: [5, 3, 2], backgroundColor: ['#5cb85c', '#f0ad4e', '#0275d8'] }],
};

const sampleCorps = {
  labels: ['Helion', 'Tharsis'],
  datasets: [{ label: 'wins', data: [8, 2], backgroundColor: ['#8e44ad', '#3498db'] }],
};

const Scores: React.FC = () => {
  const tableRows = [
    { id: 'g-1', player: 'Alice', corp: 'Helion', total: 85, rank: 1 },
    { id: 'g-1', player: 'Bob', corp: 'Tharsis', total: 70, rank: 2 },
  ];

  return (
    <Container sx={{ py: 2 }}>
      <Typography variant="h4" gutterBottom>
        Scores dashboard
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Win split — players</Typography>
            <div style={{ height: 240 }}>
              <Pie data={samplePlayers as any} />
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Win split — corporations</Typography>
            <div style={{ height: 240 }}>
              <Bar data={sampleCorps as any} />
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
                  {tableRows.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell>{r.id}</TableCell>
                      <TableCell>{r.player}</TableCell>
                      <TableCell>{r.corp}</TableCell>
                      <TableCell>{r.total}</TableCell>
                      <TableCell>{r.rank}</TableCell>
                    </TableRow>
                  ))}
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

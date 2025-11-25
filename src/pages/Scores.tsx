import React from 'react'
import { Pie, Bar } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const samplePlayers = {
  labels: ['Alice', 'Bob', 'Charlie'],
  datasets: [{ data: [5, 3, 2], backgroundColor: ['#5cb85c', '#f0ad4e', '#0275d8'] }]
}

const sampleCorps = {
  labels: ['Helion', 'Tharsis'],
  datasets: [{ label: 'wins', data: [8, 2], backgroundColor: ['#8e44ad', '#3498db'] }]
}

const Scores: React.FC = () => {
  const tableRows = [
    { id: 'g-1', player: 'Alice', corp: 'Helion', total: 85, rank: 1 },
    { id: 'g-1', player: 'Bob', corp: 'Tharsis', total: 70, rank: 2 }
  ]

  return (
    <div className="scores-root">
      <h1>Scores dashboard</h1>

      <div className="dashboard-grid">
        <div className="charts">
          <div className="chart-card">
            <h3>Win split — players</h3>
            <Pie data={samplePlayers as any} />
          </div>

          <div className="chart-card">
            <h3>Win split — corporations</h3>
            <Bar data={sampleCorps as any} />
          </div>
        </div>

        <div className="table-card">
          <h3>Games</h3>
          <table>
            <thead>
              <tr>
                <th>Game</th>
                <th>Player</th>
                <th>Corp</th>
                <th>Total</th>
                <th>Rank</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((r) => (
                <tr key={Math.random()}>
                  <td>{r.id}</td>
                  <td>{r.player}</td>
                  <td>{r.corp}</td>
                  <td>{r.total}</td>
                  <td>{r.rank}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Scores

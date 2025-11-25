import React, { useState } from 'react'
import Login from './pages/Login'
import Scores from './pages/Scores'
import SubmitGameDialog from './components/SubmitGameDialog'

const App: React.FC = () => {
  const [user, setUser] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  if (!user) {
    return <Login onLogin={(name) => setUser(name)} />
  }

  return (
    <div className="app-root">
      <header className="topbar">
        <div className="brand">Korespondenční Mars</div>
        <nav className="main-nav">
          <button onClick={() => setDialogOpen(true)}>Submit Game</button>
        </nav>
      </header>

      <main>
        <Scores />
      </main>

      {dialogOpen && (
        <SubmitGameDialog onClose={() => setDialogOpen(false)} onSave={(g) => {console.log('saved', g); setDialogOpen(false)}} />
      )}
    </div>
  )
}

export default App

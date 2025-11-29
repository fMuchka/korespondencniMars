import React, { useState } from 'react';
import Login from './pages/Login';
import Scores from './pages/Scores';
import SubmitGameDialog from './components/SubmitGameDialog';
import ChangePassword from './components/ChangePassword';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

const App: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [changeOpen, setChangeOpen] = useState(false);

  if (!user) {
    return <Login onLogin={(name) => setUser(name)} />;
  }

  return (
    <div className="app-root">
      <header className="topbar">
        <div className="brand">Korespondenční Mars</div>
        <nav className="main-nav">
          <div style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
            <span style={{ opacity: 0.85 }}>You: {user}</span>
            <button onClick={() => setDialogOpen(true)}>Submit Game</button>
            <button onClick={() => setChangeOpen(true)}>Account</button>
            <button
              onClick={async () => {
                await signOut(auth);
                setUser(null);
              }}
            >
              Logout
            </button>
          </div>
        </nav>
      </header>

      <main>
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

import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Login: React.FC<{ onLogin: (name: string) => void }> = ({
  onLogin,
}: {
  onLogin: (name: string) => void;
}) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === '' || password.trim() === '') return;
    try {
      // Use email as name@mars.local for Firebase email/password auth
      const email = `${name.trim()}@mars.local`;
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      onLogin(name.trim());
    } catch (err: any) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="landing">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={submit}>
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />

          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          {error && <div className="error">{error}</div>}

          <div className="actions">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

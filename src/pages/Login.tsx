import React, { useState } from 'react';

const Login: React.FC<{ onLogin: (name: string) => void }> = ({
  onLogin,
}: {
  onLogin: (name: string) => void;
}) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === '' || password.trim() === '') return;
    // very simple stubbed auth – in real app you'd call server
    localStorage.setItem('kgs-user', name);
    onLogin(name.trim());
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

          <div className="actions">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

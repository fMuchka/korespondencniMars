import React, { useEffect, useState } from 'react';

const MOCK_PREFIX = 'mock-game-';

const MockSavesViewer: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const [keys, setKeys] = useState<string[]>([]);

  useEffect(() => {
    loadKeys();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function loadKeys() {
    const result: string[] = [];
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(MOCK_PREFIX)) result.push(k);
      }
    } catch (e) {
      // ignore
    }
    setKeys(result.sort());
  }

  function read(key: string) {
    try {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : null;
    } catch (e) {
      return null;
    }
  }

  function del(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      // ignore
    }
    loadKeys();
  }

  function clearAll() {
    try {
      for (const k of keys) localStorage.removeItem(k);
    } catch (e) {}
    loadKeys();
  }

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h3>Mock saves debug view</h3>
        <div style={{ maxHeight: 320, overflow: 'auto' }}>
          {keys.length === 0 && <div>No mock saves found.</div>}
          {keys.map((k) => (
            <div key={k} style={{ borderBottom: '1px solid rgba(0,0,0,0.06)', padding: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <div style={{ fontFamily: 'monospace' }}>{k}</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => del(k)}>Delete</button>
                </div>
              </div>
              <pre style={{ whiteSpace: 'pre-wrap', marginTop: 8 }}>
                {JSON.stringify(read(k), null, 2)}
              </pre>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 8 }} className="actions">
          <button onClick={clearAll} disabled={keys.length === 0} className="primary">
            Clear all
          </button>
          <button onClick={onClose} className="link">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MockSavesViewer;

import React, { useEffect, useState } from 'react';
import { USE_FIREBASE_EMULATOR } from '../firebase';
import { getUseMockSubmit, setUseMockSubmit, isDevEnabled } from '../dev/devSettings';
import MockSavesViewer from './MockSavesViewer';

const DeveloperToolbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [useMock, setUseMock] = useState<boolean | null>(null);
  const [showViewer, setShowViewer] = useState(false);

  useEffect(() => {
    setUseMock(getUseMockSubmit());
  }, []);

  if (!isDevEnabled()) return null;

  return (
    <div style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
      <div
        style={{
          fontSize: 12,
          color: '#333',
          display: 'inline-flex',
          gap: 8,
          alignItems: 'center',
        }}
      >
        {USE_FIREBASE_EMULATOR ? (
          <span
            style={{ background: '#e8f5e9', color: '#2e7d32', padding: '4px 8px', borderRadius: 6 }}
          >
            Emulator
          </span>
        ) : (
          <span
            style={{ background: '#fff3e0', color: '#ef6c00', padding: '4px 8px', borderRadius: 6 }}
          >
            Dev (no emulator)
          </span>
        )}

        <label style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
          <input
            type="checkbox"
            checked={useMock === true}
            onChange={(e) => {
              const v = e.target.checked ? true : null;
              setUseMock(v);
              setUseMockSubmit(v);
            }}
          />
          Global mock
        </label>

        <button onClick={() => setShowViewer(true)}>Mock saves</button>
      </div>

      {showViewer && <MockSavesViewer onClose={() => setShowViewer(false)} />}
    </div>
  );
};

export default DeveloperToolbar;

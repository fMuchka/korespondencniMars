import React, { useEffect, useState } from 'react';
import { USE_FIREBASE_EMULATOR } from '../firebase';
import { getUseMockSubmit, setUseMockSubmit, isDevEnabled } from '../dev/devSettings';
import MockSavesViewer from './MockSavesViewer';
import { Box, Chip, FormControlLabel, Switch, Button } from '@mui/material';

const DeveloperToolbar: React.FC = () => {
  const [useMock, setUseMock] = useState<boolean | null>(null);
  const [showViewer, setShowViewer] = useState(false);

  useEffect(() => {
    setUseMock(getUseMockSubmit());
  }, []);

  if (!isDevEnabled()) return null;

  return (
    <Box sx={{ display: 'inline-flex', gap: 1, alignItems: 'center' }}>
      <Box sx={{ display: 'inline-flex', gap: 1, alignItems: 'center', fontSize: 12 }}>
        {USE_FIREBASE_EMULATOR ? (
          <Chip label="Emulator" color="success" size="small" />
        ) : (
          <Chip label="Dev (no emulator)" color="warning" size="small" />
        )}

        <FormControlLabel
          control={
            <Switch
              checked={useMock === true}
              onChange={(_e, checked) => {
                const v = checked ? true : null;
                setUseMock(v);
                setUseMockSubmit(v);
              }}
              size="small"
            />
          }
          label="Global mock"
        />

        <Button size="small" onClick={() => setShowViewer(true)}>
          Mock saves
        </Button>
      </Box>

      {showViewer && <MockSavesViewer onClose={() => setShowViewer(false)} />}
    </Box>
  );
};

export default DeveloperToolbar;

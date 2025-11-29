import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  List,
  ListItem,
  IconButton,
  ListItemText,
  DialogActions,
  Button,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
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
    for (const k of keys) localStorage.removeItem(k);
    loadKeys();
  }

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Mock saves debug view</DialogTitle>
      <DialogContent dividers>
        {keys.length === 0 ? (
          <Typography>No mock saves found.</Typography>
        ) : (
          <List sx={{ maxHeight: 320, overflow: 'auto' }}>
            {keys.map((k) => (
              <ListItem
                key={k}
                alignItems="flex-start"
                secondaryAction={
                  <IconButton edge="end" onClick={() => del(k)} aria-label="delete">
                    <Delete />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={
                    <Typography component="span" sx={{ fontFamily: 'monospace' }}>
                      {k}
                    </Typography>
                  }
                  secondary={
                    <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>
                      {JSON.stringify(read(k), null, 2)}
                    </pre>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={clearAll} disabled={keys.length === 0} color="error">
          Clear all
        </Button>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MockSavesViewer;

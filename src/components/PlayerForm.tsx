import React, { useMemo, useState } from 'react';
import { CORPORATIONS } from '../data/corporations';
import { Autocomplete, Avatar, Box, Grid, IconButton, TextField, Typography } from '@mui/material';

export type PlayerData = {
  id: string;
  name: string;
  corporation: string;
  terraformingRating: number;
  awards: number;
  milestones: number;
  greeneries: number;
  cities: number;
  victoryPoints: number;
  total: number;
  rank: number;
};

type PlayerFormProps = {
  player: PlayerData;
  onChange: (p: PlayerData) => void;
  onRemove: () => void;
  showRemove?: boolean;
};

const PlayerForm: React.FC<PlayerFormProps> = ({
  player,
  onChange,
  onRemove,
  showRemove,
}: PlayerFormProps) => {
  const update = (patch: Partial<PlayerData>) => onChange({ ...player, ...patch });

  const [corpQuery, setCorpQuery] = useState(player.corporation);
  const filtered = useMemo(() => {
    const q = corpQuery.trim().toLowerCase();
    if (!q) return CORPORATIONS;
    return CORPORATIONS.filter(
      (c) => c.name.toLowerCase().includes(q) || c.key.toLowerCase().includes(q)
    );
  }, [corpQuery]);

  return (
    <Box sx={{ p: 2, border: '1px solid rgba(0,0,0,0.06)', borderRadius: 1 }}>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={10}>
          <Typography variant="subtitle1">{player.name || 'New player'}</Typography>
        </Grid>
        <Grid item xs={2} sx={{ textAlign: 'right' }}>
          {showRemove && (
            <IconButton size="small" color="error" onClick={onRemove} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Name"
            value={player.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => update({ name: e.target.value })}
            fullWidth
            size="small"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Autocomplete
            options={filtered}
            getOptionLabel={(opt) => opt.name}
            inputValue={corpQuery}
            onInputChange={(_e, value) => {
              setCorpQuery(value);
              update({ corporation: value });
            }}
            renderOption={(props, option) => (
              <Box component="li" {...props} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: option.color, width: 28, height: 28 }}>
                  {option.key.slice(0, 2).toUpperCase()}
                </Avatar>
                <span>{option.name}</span>
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Corporation"
                placeholder="Search corporation"
                size="small"
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            label="Terraforming Rating"
            type="number"
            inputProps={{ min: 1 }}
            value={player.terraformingRating}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              update({ terraformingRating: Number(e.target.value) })
            }
            fullWidth
            size="small"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            label="Awards"
            type="number"
            inputProps={{ min: 0, max: 15 }}
            value={player.awards}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              update({ awards: Number(e.target.value) })
            }
            fullWidth
            size="small"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            label="Milestones"
            type="number"
            inputProps={{ min: 0, max: 15, step: 5 }}
            value={player.milestones}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              update({ milestones: Number(e.target.value) })
            }
            fullWidth
            size="small"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            label="Greeneries"
            type="number"
            inputProps={{ min: 0 }}
            value={player.greeneries}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              update({ greeneries: Number(e.target.value) })
            }
            fullWidth
            size="small"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            label="Cities"
            type="number"
            inputProps={{ min: 0 }}
            value={player.cities}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              update({ cities: Number(e.target.value) })
            }
            fullWidth
            size="small"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            label="Victory Points"
            type="number"
            inputProps={{ min: 0 }}
            value={player.victoryPoints}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              update({ victoryPoints: Number(e.target.value) })
            }
            fullWidth
            size="small"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Total"
            type="number"
            value={player.total}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              update({ total: Number(e.target.value) })
            }
            fullWidth
            size="small"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Rank"
            type="number"
            inputProps={{ min: 1 }}
            value={player.rank}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              update({ rank: Number(e.target.value) })
            }
            fullWidth
            size="small"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlayerForm;

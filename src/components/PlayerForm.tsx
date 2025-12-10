import React, { useMemo, useState } from 'react';
import { CORPORATIONS } from '../data/corporations';
import {
  Autocomplete,
  Avatar,
  Box,
  Grid,
  IconButton,
  TextField,
  Typography,
  Chip,
  InputAdornment,
} from '@mui/material';
import { Delete } from '@mui/icons-material';

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

export type PlayerFormProps = {
  player: PlayerData;
  onChange: (p: PlayerData) => void;
  onRemove: () => void;
  showRemove?: boolean;
  errors?: Record<string, string>;
  unavailableCorporations?: string[];
};

const PlayerForm: React.FC<PlayerFormProps> = ({
  player,
  onChange,
  onRemove,
  showRemove,
  errors,
  unavailableCorporations,
}: PlayerFormProps) => {
  const update = (patch: Partial<PlayerData>) => {
    const next: PlayerData = { ...player, ...patch } as PlayerData;
    // compute total automatically from components
    next.total =
      (Number(next.terraformingRating) || 0) +
      (Number(next.awards) || 0) +
      (Number(next.milestones) || 0) +
      (Number(next.greeneries) || 0) +
      (Number(next.cities) || 0) +
      (Number(next.victoryPoints) || 0);
    onChange(next);
  };

  const [corpQuery, setCorpQuery] = useState(player.corporation);
  const filtered = useMemo(() => {
    const q = corpQuery.trim().toLowerCase();
    if (!q) return CORPORATIONS;
    // boost matches: name/key exact contains first, then expansion matches, then rest
    const matches: typeof CORPORATIONS = [];
    const expansionMatches: typeof CORPORATIONS = [];
    const others: typeof CORPORATIONS = [];
    for (const c of CORPORATIONS) {
      const name = c.name.toLowerCase();
      const key = c.key.toLowerCase();
      const exp = (c.expansion || '').toLowerCase();
      if (name.includes(q) || key.includes(q)) matches.push(c);
      else if (exp.includes(q)) expansionMatches.push(c);
      else others.push(c);
    }
    return [...matches, ...expansionMatches, ...others];
  }, [corpQuery]);

  const selectedCorp = CORPORATIONS.find(
    (c) => c.name === player.corporation || c.key === player.corporation
  );

  return (
    <Box sx={{ p: 2, border: '1px solid rgba(0,0,0,0.06)', borderRadius: 1 }}>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={10}>
          <Typography variant="subtitle1">{player.name || 'New player'}</Typography>
        </Grid>
        <Grid item xs={2} sx={{ textAlign: 'right' }}>
          {showRemove && (
            <IconButton size="small" color="error" onClick={onRemove} aria-label="delete">
              <Delete />
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
            error={Boolean(errors?.name)}
            helperText={errors?.name}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Autocomplete
            options={filtered}
            getOptionLabel={(opt) => opt.name}
            inputValue={corpQuery}
            getOptionDisabled={(opt) =>
              Boolean(
                unavailableCorporations &&
                  opt &&
                  unavailableCorporations.includes(opt.name) &&
                  opt.name !== player.corporation
              )
            }
            onInputChange={(_e, value) => {
              setCorpQuery(value);
              update({ corporation: value });
            }}
            renderOption={(props, option) => {
              const isDisabled = Boolean(
                unavailableCorporations &&
                  option &&
                  unavailableCorporations.includes(option.name) &&
                  option.name !== player.corporation
              );
              const chipBg =
                option.expansion === 'venus'
                  ? '#1976d2'
                  : option.expansion === 'prelude'
                    ? '#43a047'
                    : '#fb8c00';
              return (
                <Box
                  component="li"
                  {...props}
                  sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
                >
                  <Avatar sx={{ bgcolor: option.color, width: 28, height: 28 }}>
                    {option.key.slice(0, 2).toUpperCase()}
                  </Avatar>
                  <span>{option.name}</span>
                  {option.expansion && (
                    <Chip
                      label={option.expansion}
                      size="small"
                      sx={{
                        ml: 'auto',
                        textTransform: 'capitalize',
                        bgcolor: chipBg,
                        color: '#fff',
                        opacity: isDisabled ? 0.45 : 1,
                      }}
                      clickable={false}
                    />
                  )}
                </Box>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Corporation"
                placeholder="Search corporation"
                size="small"
                error={Boolean(errors?.corporation)}
                helperText={errors?.corporation}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: selectedCorp ? (
                    <InputAdornment position="start">
                      <Avatar
                        sx={{ bgcolor: selectedCorp.color, width: 20, height: 20, fontSize: 11 }}
                      >
                        {selectedCorp.key.slice(0, 2).toUpperCase()}
                      </Avatar>
                    </InputAdornment>
                  ) : (
                    params.InputProps?.startAdornment
                  ),
                }}
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
            error={Boolean(errors?.terraformingRating)}
            helperText={errors?.terraformingRating}
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
            error={Boolean(errors?.awards)}
            helperText={errors?.awards}
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
            error={Boolean(errors?.milestones)}
            helperText={errors?.milestones}
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
            error={Boolean(errors?.greeneries)}
            helperText={errors?.greeneries}
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
            error={Boolean(errors?.cities)}
            helperText={errors?.cities}
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
            error={Boolean(errors?.victoryPoints)}
            helperText={errors?.victoryPoints}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Total"
            type="number"
            value={player.total}
            fullWidth
            size="small"
            InputProps={{ readOnly: true }}
            error={Boolean(errors?.total)}
            helperText={errors?.total}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Rank"
            type="number"
            inputProps={{ min: 1 }}
            value={player.rank}
            fullWidth
            size="small"
            InputProps={{ readOnly: true }}
            error={Boolean(errors?.rank)}
            helperText={errors?.rank}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlayerForm;

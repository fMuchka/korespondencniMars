import React, { useMemo, useState } from 'react'
import { CORPORATIONS, Corporation } from '../data/corporations'

export type PlayerData = {
  id: string
  name: string
  corporation: string
  terraformingRating: number
  awards: number
  milestones: number
  greeneries: number
  cities: number
  victoryPoints: number
  total: number
  rank: number
}

type PlayerFormProps = {
  player: PlayerData
  onChange: (p: PlayerData) => void
  onRemove: () => void
  showRemove?: boolean
}

const PlayerForm: React.FC<PlayerFormProps> = ({ player, onChange, onRemove, showRemove }: PlayerFormProps) => {
  const update = (patch: Partial<PlayerData>) => onChange({ ...player, ...patch })

  const [corpQuery, setCorpQuery] = useState(player.corporation)
  const filtered = useMemo(() => {
    const q = corpQuery.trim().toLowerCase()
    if (!q) return CORPORATIONS
    return CORPORATIONS.filter((c) => c.name.toLowerCase().includes(q) || c.key.toLowerCase().includes(q))
  }, [corpQuery])

  return (
    <div className="player-form">
      <div className="header">
        <strong>{player.name || 'New player'}</strong>
        {showRemove && (
          <button className="danger" onClick={onRemove}>Delete</button>
        )}
      </div>

      <label>Name</label>
      <input value={player.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update({ name: e.target.value })} />

      <label>Corporation</label>
      <div className="corp-select">
        <input value={corpQuery} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setCorpQuery(e.target.value); update({ corporation: e.target.value }) }} placeholder="Search corporation" />
        {corpQuery && (
          <div className="corp-list">
            {filtered.slice(0, 10).map((c: Corporation) => (
              <div key={c.key} className="corp-item" onClick={() => { setCorpQuery(c.name); update({ corporation: c.name }) }}>
                <div className="corp-icon" style={{ background: c.color }}>{c.key.slice(0,2).toUpperCase()}</div>
                <div>{c.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <label>Terraforming Rating</label>
      <input type="number" min={1} value={player.terraformingRating} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update({ terraformingRating: Number(e.target.value) })} />

      <label>Awards</label>
      <input type="number" min={0} max={15} value={player.awards} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update({ awards: Number(e.target.value) })} />

      <label>Milestones</label>
      <input type="number" min={0} max={15} step={5} value={player.milestones} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update({ milestones: Number(e.target.value) })} />

      <label>Greeneries</label>
      <input type="number" min={0} value={player.greeneries} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update({ greeneries: Number(e.target.value) })} />

      <label>Cities</label>
      <input type="number" min={0} value={player.cities} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update({ cities: Number(e.target.value) })} />

      <label>Victory Points</label>
      <input type="number" min={0} value={player.victoryPoints} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update({ victoryPoints: Number(e.target.value) })} />

      <label>Total</label>
      <input type="number" value={player.total} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update({ total: Number(e.target.value) })} />

      <label>Rank</label>
      <input type="number" min={1} value={player.rank} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update({ rank: Number(e.target.value) })} />
    </div>
  )
}

export default PlayerForm

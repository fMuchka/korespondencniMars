export type Corporation = {
  key: string;
  name: string;
  color: string;
  expansion: 'base' | 'prelude' | 'venus';
};

// Canonical list (base + Prelude + Venus Next) — curated for UI use.
// Each corporation has an `expansion` tag to allow filtering/search boosts in the UI.
export const CORPORATIONS: Corporation[] = (
  [
    { key: 'IN', name: 'Inventrix', color: '#9b59b6', expansion: 'base' },
    { key: 'PB', name: 'Phobolog', color: '#e67e22', expansion: 'base' },
    { key: 'HE', name: 'Helion', color: '#f39c12', expansion: 'base' },
    { key: 'TE', name: 'Teractor', color: '#95a5a6', expansion: 'base' },
    { key: 'SS', name: 'Saturn Systems', color: '#16a085', expansion: 'base' },
    { key: 'UN', name: 'United Nations Mars Initiative', color: '#4b86b4', expansion: 'base' },
    { key: 'IC', name: 'Interplanetary Cinematics', color: '#f2994a', expansion: 'base' },
    { key: 'CR', name: 'Credicor', color: '#2f80ed', expansion: 'base' },
    { key: 'TG', name: 'ThorGate', color: '#2d9cdb', expansion: 'base' },
    { key: 'MG', name: 'Mining Guild', color: '#b5832a', expansion: 'base' },
    { key: 'EC', name: 'Ecoline', color: '#27ae60', expansion: 'base' },
    { key: 'TR', name: 'Tharsis Republic', color: '#34495e', expansion: 'base' },
    { key: 'CS', name: 'Cheung Shing Mars', color: '#e74c3c', expansion: 'prelude' },
    { key: 'PL', name: 'Point Luna', color: '#d35400', expansion: 'prelude' },
    { key: 'RI', name: 'Robinson Industries', color: '#7f8c8d', expansion: 'prelude' },
    { key: 'VT', name: 'Valley Trust', color: '#3498db', expansion: 'prelude' },
    { key: 'VD', name: 'Vitor', color: '#8e44ad', expansion: 'prelude' },
    { key: 'AP', name: 'Aphrodite', color: '#c0392b', expansion: 'venus' },
    { key: 'MN', name: 'Manutech', color: '#16a085', expansion: 'venus' },
    { key: 'VR', name: 'Viron', color: '#2980b9', expansion: 'venus' },
    { key: 'MS', name: 'Morning Star Inc.', color: '#f39c12', expansion: 'venus' },
    { key: 'CE', name: 'Celestic', color: '#b23aee', expansion: 'venus' },
    { key: 'SP', name: 'Splice', color: '#27ae60', expansion: 'venus' },
    { key: 'RC', name: 'Recyclon', color: '#795548', expansion: 'venus' },
    { key: 'AC', name: 'Arcadian Communities', color: '#1abc9c', expansion: 'venus' },
    { key: 'PU', name: 'Pharmacy Union', color: '#9b59b6', expansion: 'venus' },
    { key: 'AD', name: 'AstroDrill', color: '#34495e', expansion: 'venus' },
  ] as Corporation[]
).sort((a, b) => a.name.localeCompare(b.name));

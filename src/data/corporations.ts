export type Corporation = { key: string; name: string; color: string };

export const CORPORATIONS: Corporation[] = [
  { key: 'A', name: 'Argent Energy', color: '#e74c3c' },
  { key: 'C', name: 'Credicor', color: '#3498db' },
  { key: 'H', name: 'Helion', color: '#f39c12' },
  { key: 'M', name: 'Machinery', color: '#2ecc71' },
  { key: 'N', name: 'Noctis', color: '#9b59b6' },
  { key: 'S', name: 'Saturn Systems', color: '#1abc9c' },
  { key: 'T', name: 'Tharsis Republic', color: '#34495e' },
].sort((a, b) => a.name.localeCompare(b.name));

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test-utils';
import DeveloperToolbar from '../DeveloperToolbar';

// Mock the dev settings module
vi.mock('../../dev/devSettings', () => ({
  getUseMockSubmit: vi.fn(() => false),
  setUseMockSubmit: vi.fn(),
  isDevEnabled: vi.fn(() => true),
}));

// Mock Firebase
vi.mock('../../firebase', () => ({
  USE_FIREBASE_EMULATOR: true,
}));

describe('DeveloperToolbar', () => {
  it('renders the toolbar when dev mode is enabled', () => {
    render(<DeveloperToolbar />);
    
    // Check for the emulator chip
    expect(screen.getByText('Emulator')).toBeInTheDocument();
    
    // Check for the global mock switch
    expect(screen.getByLabelText('Global mock')).toBeInTheDocument();
    
    // Check for the mock saves button
    expect(screen.getByRole('button', { name: /mock saves/i })).toBeInTheDocument();
  });

  it('displays the correct emulator status', () => {
    render(<DeveloperToolbar />);
    
    const emulatorChip = screen.getByText('Emulator');
    expect(emulatorChip).toBeInTheDocument();
  });

  it('has a clickable mock saves button', () => {
    render(<DeveloperToolbar />);
    
    const button = screen.getByRole('button', { name: /mock saves/i });
    expect(button).toBeEnabled();
  });
});

import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import SubmitGameDialog from '../SubmitGameDialog';
import type { PlayerFormProps } from '../PlayerForm'; // Add this import

// Mock PlayerForm since we tested it separately and it's complex
vi.mock('../PlayerForm', () => ({
  default: ({ player, onChange, onRemove, showRemove, errors }: PlayerFormProps) => (
    <div data-testid={`player-form-${player.id}`}>
      <input
        aria-label="Name"
        value={player.name}
        onChange={(e) => onChange({ ...player, name: e.target.value })}
      />
      <input
        aria-label="Corporation"
        value={player.corporation}
        onChange={(e) => onChange({ ...player, corporation: e.target.value })}
      />
      {showRemove && <button onClick={onRemove}>Remove</button>}
      {errors?.name && <span>{errors.name}</span>}
      {errors?.corporation && <span>{errors.corporation}</span>}
    </div>
  ),
}));

// Mock Firebase Firestore
vi.mock('firebase/firestore', async () => {
  return {
    getFirestore: vi.fn(),
    connectFirestoreEmulator: vi.fn(),
    collection: vi.fn(),
    addDoc: vi.fn().mockResolvedValue({ id: 'mock-doc-id' }),
  };
});

describe('SubmitGameDialog', () => {
  const mockOnClose = vi.fn();
  const mockOnSave = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with default single player', () => {
    render(<SubmitGameDialog onClose={mockOnClose} onSave={mockOnSave} />);

    expect(screen.getByText('Submit Game')).toBeInTheDocument();
    expect(screen.getByText('Add player')).toBeInTheDocument();
    expect(screen.getByTestId(/player-form-p-/)).toBeInTheDocument();
  });

  it('adds a new player when "Add player" is clicked', async () => {
    const user = userEvent.setup();
    render(<SubmitGameDialog onClose={mockOnClose} onSave={mockOnSave} />);

    const addBtn = screen.getByText('Add player');
    await user.click(addBtn);

    expect(screen.getAllByTestId(/player-form-/)).toHaveLength(2);
  });

  it('removes a player when remove is clicked', async () => {
    const user = userEvent.setup();
    render(<SubmitGameDialog onClose={mockOnClose} onSave={mockOnSave} />);

    // Add a second player first (remove button only shows when > 1 player)
    await user.click(screen.getByText('Add player'));
    expect(screen.getAllByTestId(/player-form-/)).toHaveLength(2);

    // Remove one
    const removeBtns = screen.getAllByText('Remove');
    await user.click(removeBtns[0]);

    expect(screen.getAllByTestId(/player-form-/)).toHaveLength(1);
  });

  it('shows error if saving without valid fields', async () => {
    render(<SubmitGameDialog onClose={mockOnClose} onSave={mockOnSave} />);

    // Try to save with empty default player
    const saveBtn = screen.getByRole('button', { name: 'Save' });

    // Button should be disabled due to validation
    expect(saveBtn).toBeDisabled();

    // Ensure onSave is not called
    expect(mockOnSave).not.toHaveBeenCalled();
  });

  it('saves correctly when data is valid (Mock Mode)', async () => {
    const user = userEvent.setup();
    render(<SubmitGameDialog onClose={mockOnClose} onSave={mockOnSave} />);

    // Check mock checkbox if visible (dev mode)
    // Determining if dev mode is active in test environment is tricky without mocking import.meta.env
    // But we can just fill valid data

    // Fill player data
    const nameInputs = screen.getAllByLabelText('Name');
    const corpInputs = screen.getAllByLabelText('Corporation');

    await user.type(nameInputs[0], 'Alice');
    await user.type(corpInputs[0], 'Tharsis'); // Validating uniqueness logic

    const saveBtn = screen.getByRole('button', { name: 'Save' });
    expect(saveBtn).not.toBeDisabled();

    await user.click(saveBtn);

    // onSave should be called
    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalled();
    });
  });
});

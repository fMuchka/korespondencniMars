import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '../../test-utils'; // Custom render with providers
import userEvent from '@testing-library/user-event';
import Login from '../Login';
import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth';

// Mock Firebase Auth
vi.mock('firebase/auth', async () => {
  const actual = await vi.importActual('firebase/auth');
  return {
    ...actual,
    signInWithEmailAndPassword: vi.fn(),
    connectAuthEmulator: vi.fn(),
    getAuth: vi.fn(() => ({})),
  };
});

describe('Login Page', () => {
  const mockOnLogin = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form correctly', () => {
    render(<Login onLogin={mockOnLogin} />);
    expect(screen.getByLabelText(/nickname/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    const user = userEvent.setup();
    render(<Login onLogin={mockOnLogin} />);

    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(signInWithEmailAndPassword).not.toHaveBeenCalled();
  });

  it('handles successful login', async () => {
    const user = userEvent.setup();
    render(<Login onLogin={mockOnLogin} />);

    // Ensure mock returns a promise that resolves
    vi.mocked(signInWithEmailAndPassword).mockResolvedValue({
      user: { email: 'test@example.com' },
      operationType: 'signIn',
      providerId: 'password',
    } as unknown as UserCredential);

    await user.type(screen.getByLabelText(/nickname/i), 'test');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'test@mars.local',
        'password123'
      );
      expect(mockOnLogin).toHaveBeenCalledWith('test');
    });
  });

  it('displays error on failed login', async () => {
    const user = userEvent.setup();
    render(<Login onLogin={mockOnLogin} />);

    vi.mocked(signInWithEmailAndPassword).mockRejectedValueOnce(new Error('Invalid credentials'));

    await user.type(screen.getByLabelText(/nickname/i), 'wrong');
    await user.type(screen.getByLabelText(/password/i), 'wrongpass');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/login failed/i)).toBeInTheDocument();
    });
  });
});

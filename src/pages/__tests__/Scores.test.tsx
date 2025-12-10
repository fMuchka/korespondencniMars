import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '../../test-utils';
import Scores from '../Scores';
import {
  FirestoreError,
  Query,
  QuerySnapshot,
  DocumentData,
  SnapshotListenOptions,
} from 'firebase/firestore';

// Mock ChartJS to avoid canvas issues in JSDOM
vi.mock('react-chartjs-2', () => ({
  Pie: () => <div data-testid="pie-chart" />,
  Bar: () => <div data-testid="bar-chart" />,
}));

// Mock Firebase hooks/functions
vi.mock('firebase/firestore', async () => {
  const actual = await vi.importActual('firebase/firestore');

  // Define mock data inside factory to avoid hoisting issues
  const mockDocs = [
    {
      id: 'game1',
      data: () => ({
        players: [
          { name: 'Alice', corporation: 'Tharsis', rank: 1, total: 50 },
          { name: 'Bob', corporation: 'Ecoline', rank: 2, total: 45 },
        ],
        createdAt: '2025-01-01T12:00:00Z',
        _mock: false,
      }),
    },
  ];

  return {
    ...actual,
    collection: vi.fn(),
    query: vi.fn(),
    orderBy: vi.fn(),
    onSnapshot: vi.fn((_query, onNext) => {
      // Simulate async data load
      setTimeout(() => {
        onNext({
          docs: mockDocs,
        });
      }, 10);
      return () => {}; // unsubscribe
    }),
    getDocs: vi.fn().mockResolvedValue({ docs: mockDocs }),
  };
});

describe('Scores Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    render(<Scores />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders games table after data load', async () => {
    render(<Scores />);

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Tharsis')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('renders charts', async () => {
    render(<Scores />);

    await waitFor(() => {
      expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
      expect(screen.getAllByTestId('bar-chart')).toHaveLength(2); // Corps + Placements
    });
  });

  it('displays error if fetch fails', async () => {
    // Override onSnapshot to throw or simulate error
    const { onSnapshot } = await import('firebase/firestore');
    vi.mocked(onSnapshot).mockImplementationOnce(
      (
        _q: Query<unknown, DocumentData>,
        _arg2: SnapshotListenOptions | ((snapshot: QuerySnapshot<unknown, DocumentData>) => void),
        _arg3?:
          | ((snapshot: QuerySnapshot<unknown, DocumentData>) => void)
          | ((error: FirestoreError) => void)
      ) => {
        // In this test case, we know the 3rd arg is the error callback
        const errorCallback = _arg3 as (error: FirestoreError) => void;
        if (errorCallback) {
          const mockError: FirestoreError = {
            name: 'FirebaseError',
            code: 'permission-denied',
            message: 'Permission denied',
            stack: 'Mock stack trace',
          };
          errorCallback(mockError);
        }
        return () => {};
      }
    );

    // Also mock getDocs fallback failure
    const { getDocs } = await import('firebase/firestore');
    vi.mocked(getDocs).mockRejectedValueOnce(new Error('Fallback failed'));

    render(<Scores />);

    await waitFor(() => {
      expect(screen.getByText(/failed to load games/i)).toBeInTheDocument();
    });
  });
});

import { vi } from 'vitest';

/**
 * Mock Firebase Firestore
 */
export const mockFirestore = {
  collection: vi.fn(() => mockFirestore),
  doc: vi.fn(() => mockFirestore),
  get: vi.fn(() => Promise.resolve({ exists: true, data: () => ({}) })),
  set: vi.fn(() => Promise.resolve()),
  update: vi.fn(() => Promise.resolve()),
  delete: vi.fn(() => Promise.resolve()),
  onSnapshot: vi.fn(),
  where: vi.fn(() => mockFirestore),
  orderBy: vi.fn(() => mockFirestore),
  limit: vi.fn(() => mockFirestore),
};

/**
 * Mock Firebase Auth
 */
export const mockAuth = {
  currentUser: null,
  signInWithEmailAndPassword: vi.fn(() =>
    Promise.resolve({ user: { uid: 'test-uid', email: 'test@example.com' } })
  ),
  signOut: vi.fn(() => Promise.resolve()),
  onAuthStateChanged: vi.fn(),
};

/**
 * Mock Firebase App
 */
export const mockFirebaseApp = {
  name: 'test-app',
  options: {},
};

/**
 * Setup Firebase mocks for tests
 * Call this in your test setup or individual test files
 */
export const setupFirebaseMocks = () => {
  vi.mock('../firebase', () => ({
    db: mockFirestore,
    auth: mockAuth,
    app: mockFirebaseApp,
  }));
};

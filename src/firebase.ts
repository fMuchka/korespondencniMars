import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// Read firebase config from Vite environment variables (VITE_ prefix)
// This keeps sensitive values out of source control. Create a local
// `.env.local` or `.env` file with VITE_FIREBASE_* keys (see .env.example).
function requiredEnv(key: string, val: string | undefined) {
  if (!val) {
    throw new Error(
      `Missing required environment variable: ${key}. Add it to your .env.local file`
    );
  }
  return val;
}

const firebaseConfig = {
  apiKey: requiredEnv('VITE_FIREBASE_API_KEY', import.meta.env.VITE_FIREBASE_API_KEY),
  authDomain: requiredEnv('VITE_FIREBASE_AUTH_DOMAIN', import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  projectId: requiredEnv('VITE_FIREBASE_PROJECT_ID', import.meta.env.VITE_FIREBASE_PROJECT_ID),
  storageBucket: requiredEnv(
    'VITE_FIREBASE_STORAGE_BUCKET',
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET
  ),
  messagingSenderId: requiredEnv(
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID
  ),
  appId: requiredEnv('VITE_FIREBASE_APP_ID', import.meta.env.VITE_FIREBASE_APP_ID),
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Detect emulator usage. Prefer an explicit flag, else fall back to dev + localhost.
const explicitEmulatorFlag =
  import.meta.env.VITE_FIREBASE_EMULATOR === 'true' ||
  import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true';
const runningOnLocalhost =
  typeof window !== 'undefined' &&
  window.location &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
export const USE_FIREBASE_EMULATOR =
  explicitEmulatorFlag || (import.meta.env.DEV && runningOnLocalhost);

if (USE_FIREBASE_EMULATOR) {
  // Read optional emulator host/port overrides from Vite env vars, with sensible defaults.
  const FIRESTORE_HOST = import.meta.env.VITE_FIRESTORE_EMULATOR_HOST ?? 'localhost';
  const FIRESTORE_PORT = Number(import.meta.env.VITE_FIRESTORE_EMULATOR_PORT ?? 8080);
  const AUTH_HOST = import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_HOST ?? 'localhost';
  const AUTH_PORT = Number(import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_PORT ?? 9099);

  // Connect SDKs to emulators.
  try {
    connectFirestoreEmulator(db, FIRESTORE_HOST, FIRESTORE_PORT);
  } catch (e) {
    // ignore failures — emulator might not be running; SDK will default to production if not connected
    // We intentionally swallow errors here so dev environment doesn't crash.
    // eslint-disable-next-line no-console
    console.warn('Failed to connect Firestore emulator:', e);
  }

  try {
    connectAuthEmulator(auth, `http://${AUTH_HOST}:${AUTH_PORT}`);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Failed to connect Auth emulator:', e);
  }
}

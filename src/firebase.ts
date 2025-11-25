import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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

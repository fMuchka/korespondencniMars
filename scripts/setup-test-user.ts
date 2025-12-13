/**
 * Script to create a test user in Firebase Auth Emulator
 * Run this after starting the emulator: firebase emulators:start
 *
 * Usage: tsx scripts/setup-test-user.ts
 */

import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, createUserWithEmailAndPassword } from 'firebase/auth';

// Minimal config for emulator connection
const app = initializeApp({
  apiKey: 'fake-api-key',
  projectId: 'demo-project',
});

const auth = getAuth(app);
connectAuthEmulator(auth, 'http://localhost:9099');

async function createTestUser() {
  try {
    const email = 'TestUser@mars.local';
    const password = 'password123';

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('✅ Test user created successfully!');
    console.log('   Email:', email);
    console.log('   Password:', password);
    console.log('   UID:', userCredential.user.uid);
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('✅ Test user already exists');
    } else {
      console.error('❌ Error creating test user:', error.message);
      process.exit(1);
    }
  }
  process.exit(0);
}

createTestUser();

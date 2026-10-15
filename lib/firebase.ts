import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

let tested = false;
export async function testConnection() {
  if (tested) return;
  tested = true;
  try {
    // Timeout race to prevent 10s network wait warning if backend is offline or unreachable
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Connection check timeout')), 3000)
    );
    await Promise.race([
      getDocFromServer(doc(db, 'test', 'connection')),
      timeoutPromise,
    ]);
  } catch (error) {
    // Offline or connection delay expected in offline environments
    if (process.env.NODE_ENV === 'development') {
      console.log('Firebase connection initialized (operating in standard mode).');
    }
  }
}

if (typeof window !== 'undefined') {
  testConnection().catch(() => {});
}

import { applicationDefault, cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import firebaseConfig from '../firebase-applet-config.json';

function getServerApp() {
  const existing = getApps().find((app) => app.name === 'booking-server');
  if (existing) return existing;

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  return initializeApp({
    projectId: firebaseConfig.projectId,
    credential: raw ? cert(JSON.parse(raw)) : applicationDefault(),
  }, 'booking-server');
}

export function getBookingCollection() {
  return getFirestore(getServerApp(), firebaseConfig.firestoreDatabaseId).collection('bookings');
}

export async function isBookingAdmin(request: Request) {
  const token = request.headers.get('authorization')?.match(/^Bearer (\S+)$/i)?.[1];
  const adminUid = process.env.FIREBASE_ADMIN_UID?.trim();
  if (!token || !adminUid) return false;

  try {
    const user = await getAuth(getServerApp()).verifyIdToken(token);
    return user.uid === adminUid;
  } catch {
    return false;
  }
}

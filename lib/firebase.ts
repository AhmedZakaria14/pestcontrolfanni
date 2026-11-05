import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDocFromServer,
  collection,
  getDocs,
  setDoc,
  updateDoc,
  runTransaction,
  getDocsFromServer,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);
export const auth = getAuth(app);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
    },
    operationType,
    path,
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Data Models
export interface FirebaseWarranty {
  id: string;
  code: string;
  customerName: string;
  customerPhone?: string;
  serviceType: string;
  propertyAddress: string;
  city?: string;
  issueDate: string;
  expiryDate: string;
  durationYears?: number;
  status: 'active' | 'expired' | 'pending';
  technicianName?: string;
  pesticideDetails?: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface FirebaseBooking {
  id: string;
  name: string;
  phone: string;
  service: string;
  area?: string;
  notes?: string;
  status: 'new' | 'contacted' | 'scheduled' | 'completed' | 'cancelled';
  source?: string;
  createdAt: string;
  updatedAt?: string;
}

// Real database functions with error handling
export async function saveBookingToFirestore(
  bookingData: Omit<FirebaseBooking, 'id' | 'createdAt' | 'status'> & {
    status?: FirebaseBooking['status'];
    id?: string;
  }
): Promise<FirebaseBooking> {
  const bookingId = bookingData.id || `book-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;
  const now = new Date().toISOString();
  const newBooking: FirebaseBooking = {
    id: bookingId,
    name: bookingData.name.trim(),
    phone: bookingData.phone.trim(),
    service: bookingData.service || 'حجز فحص ومكافحة شاملة',
    area: bookingData.area?.trim() || '',
    notes: bookingData.notes?.trim() || '',
    status: bookingData.status || 'new',
    source: bookingData.source || 'Website Booking Form',
    createdAt: now,
    updatedAt: now,
  };

  const path = `bookings/${bookingId}`;

  if (typeof window !== 'undefined') {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBooking),
    });
    if (!res.ok) throw new Error(`Booking save failed (${res.status})`);
    const result = await res.json();
    if (!result.success) throw new Error('Booking save was not confirmed');
    return newBooking;
  }

  try {
    const ref = doc(db, 'bookings', bookingId);
    return await runTransaction(db, async (transaction) => {
      const existing = await transaction.get(ref);
      if (existing.exists()) return newBooking;
      transaction.set(ref, newBooking);
      return newBooking;
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}


export async function fetchBookingsFromFirestore(): Promise<FirebaseBooking[]> {
  const path = 'bookings';
  try {
    const q = query(collection(db, 'bookings'));
    const snapshot = await getDocsFromServer(q);
    const bookings: FirebaseBooking[] = [];
    snapshot.forEach((d) => {
      bookings.push({ id: d.id, ...d.data() } as FirebaseBooking);
    });
    // Sort descending by createdAt
    return bookings.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

export function subscribeToBookings(
  onData: (bookings: FirebaseBooking[]) => void,
  onError?: (err: unknown) => void
) {
  const q = query(collection(db, 'bookings'));
  return onSnapshot(
    q,
    (snapshot) => {
      const bookings: FirebaseBooking[] = [];
      snapshot.forEach((d) => {
        bookings.push({ id: d.id, ...d.data() } as FirebaseBooking);
      });
      bookings.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
      onData(bookings);
    },
    (error) => {
      if (onError) onError(error);
      else console.error('Error listening to bookings:', error);
    }
  );
}

export async function updateBookingStatusInFirestore(
  bookingId: string,
  newStatus: FirebaseBooking['status']
): Promise<void> {
  const path = `bookings/${bookingId}`;
  try {
    const now = new Date().toISOString();
    await updateDoc(doc(db, 'bookings', bookingId), {
      status: newStatus,
      updatedAt: now,
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deleteBookingFromFirestore(bookingId: string): Promise<void> {
  const path = `bookings/${bookingId}`;
  try {
    await deleteDoc(doc(db, 'bookings', bookingId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// Warranties CRUD
export async function saveWarrantyToFirestore(
  warrantyData: Omit<FirebaseWarranty, 'id' | 'createdAt'> & { id?: string }
): Promise<FirebaseWarranty> {
  const cleanCode = (warrantyData.id || warrantyData.code).trim().toUpperCase();
  const now = new Date().toISOString();
  const warrantyDoc: FirebaseWarranty = {
    id: cleanCode,
    ...warrantyData,
    code: cleanCode,
    createdAt: now,
    updatedAt: now,
  };

  const path = `warranties/${cleanCode}`;

  // If on client, try API first for Cloud SQL + Firestore dual save
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch('/api/warranties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(warrantyDoc),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) return json.warranty || warrantyDoc;
      }
    } catch (apiErr) {
      console.warn('API dual save failed, falling back to direct Firestore:', apiErr);
    }
  }

  // Fallback or Server-side save directly to Firestore
  try {
    await setDoc(doc(db, 'warranties', cleanCode), warrantyDoc);
    return warrantyDoc;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}


export async function fetchWarrantiesFromFirestore(): Promise<FirebaseWarranty[]> {
  const path = 'warranties';
  try {
    const q = query(collection(db, 'warranties'));
    const snapshot = await getDocs(q);
    const warranties: FirebaseWarranty[] = [];
    snapshot.forEach((d) => {
      warranties.push({ id: d.id, ...d.data() } as FirebaseWarranty);
    });
    return warranties.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

export function subscribeToWarranties(
  onData: (warranties: FirebaseWarranty[]) => void,
  onError?: (err: unknown) => void
) {
  const q = query(collection(db, 'warranties'));
  return onSnapshot(
    q,
    (snapshot) => {
      const warranties: FirebaseWarranty[] = [];
      snapshot.forEach((d) => {
        warranties.push({ id: d.id, ...d.data() } as FirebaseWarranty);
      });
      warranties.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
      onData(warranties);
    },
    (error) => {
      if (onError) onError(error);
      else console.error('Error listening to warranties:', error);
    }
  );
}

export async function deleteWarrantyFromFirestore(code: string): Promise<void> {
  const cleanCode = code.trim().toUpperCase();
  const path = `warranties/${cleanCode}`;
  try {
    await deleteDoc(doc(db, 'warranties', cleanCode));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

let tested = false;
export async function testConnection() {
  if (tested) return;
  tested = true;
  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Connection check timeout')), 3000)
    );
    await Promise.race([
      getDocFromServer(doc(db, 'test', 'connection')),
      timeoutPromise,
    ]);
  } catch {
    // Offline or connection delay expected in offline environments
  }
}

if (typeof window !== 'undefined') {
  testConnection().catch(() => {});
}

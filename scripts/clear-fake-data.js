import { readFileSync } from 'fs';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = JSON.parse(
  readFileSync(new URL('../firebase-applet-config.json', import.meta.url), 'utf-8')
);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

async function cleanAndTest() {
  console.log('Testing step 1: getDocs bookings...');
  try {
    const bookingsSnap = await getDocs(collection(db, 'bookings'));
    console.log(`✓ Get bookings success: ${bookingsSnap.size} bookings.`);
    for (const docSnap of bookingsSnap.docs) {
      console.log(`Deleting booking ${docSnap.id}...`);
      await deleteDoc(doc(db, 'bookings', docSnap.id));
    }
  } catch (err) {
    console.error('X Error on bookings step:', err);
  }

  console.log('Testing step 2: getDocs warranties...');
  try {
    const warrantiesSnap = await getDocs(collection(db, 'warranties'));
    console.log(`✓ Get warranties success: ${warrantiesSnap.size} warranties.`);
    for (const docSnap of warrantiesSnap.docs) {
      console.log(`Deleting warranty ${docSnap.id}...`);
      await deleteDoc(doc(db, 'warranties', docSnap.id));
    }
  } catch (err) {
    console.error('X Error on warranties step:', err);
  }

  console.log('Testing step 3: write booking...');
  const testId = `book-${Date.now()}`;
  const testBooking = {
    id: testId,
    name: 'حجز تجريبي',
    phone: '01000989063',
    service: 'حجز فحص ومكافحة شاملة',
    area: 'القاهرة الجديدة',
    notes: 'تجربة حقيقية',
    status: 'new',
    source: 'Test Script',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  try {
    await setDoc(doc(db, 'bookings', testId), testBooking);
    console.log('✓ Write booking success!');
    await deleteDoc(doc(db, 'bookings', testId));
    console.log('✓ Clean test booking success!');
  } catch (err) {
    console.error('X Error on setDoc booking:', err);
  }
}

cleanAndTest();

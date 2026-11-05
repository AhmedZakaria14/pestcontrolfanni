import { sqlDb } from './src/db';
import { bookings } from './src/db/schema';
import { desc } from 'drizzle-orm';
import 'dotenv/config';

async function check() {
  try {
    const data = await sqlDb.select().from(bookings).orderBy(desc(bookings.createdAt)).limit(5);
    console.log('SQL Bookings Count:', data.length);
    console.log('Last Bookings:', JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('SQL Error:', err);
  }
}

check();

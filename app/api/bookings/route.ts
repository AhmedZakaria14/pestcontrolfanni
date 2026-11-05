import { randomUUID } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { sqlDb } from '@/src/db';
import { bookings } from '@/src/db/schema';
import { eq } from 'drizzle-orm';
import { getBookingCollection, isBookingAdmin } from '@/lib/firebase-admin';
import type { FirebaseBooking } from '@/lib/firebase';

const statuses = new Set(['new', 'contacted', 'scheduled', 'completed', 'cancelled']);
const sqlConfigured = () => Boolean(process.env.SQL_HOST && process.env.SQL_USER);
const clean = (value: unknown) => typeof value === 'string' ? value.trim() : '';
const validId = (id: string) => /^[a-zA-Z0-9_-]{1,128}$/.test(id);

function failed(error: string, status: number) {
  return NextResponse.json({ success: false, error }, { status });
}

async function fetchFirestoreBookings() {
  const snapshot = await getBookingCollection().get();
  return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as FirebaseBooking));
}

export async function HEAD(req: NextRequest) {
  return new NextResponse(null, {
    status: await isBookingAdmin(req) ? 204 : 403,
    headers: { 'Cache-Control': 'private, no-store' },
  });
}

export async function GET(req: NextRequest) {
  if (!(await isBookingAdmin(req))) return failed('Admin authentication required', 403);
  const [firestore, sql] = await Promise.allSettled([
    fetchFirestoreBookings(),
    sqlConfigured() ? sqlDb.select().from(bookings) : Promise.resolve([]),
  ]);

  if (firestore.status === 'rejected') console.error('Booking Firestore read failed:', firestore.reason);
  if (sql.status === 'rejected') console.error('Legacy booking SQL read failed:', sql.reason);
  if (firestore.status === 'rejected' && (sql.status === 'rejected' || !sqlConfigured())) {
    return failed('Could not load bookings', 503);
  }

  const data = new Map<string, FirebaseBooking & { storage: 'cloudsql' | 'firestore' }>();
  if (sql.status === 'fulfilled') {
    for (const row of sql.value) {
      data.set(row.id, {
        ...row,
        area: row.area ?? undefined,
        notes: row.notes ?? undefined,
        source: row.source ?? undefined,
        status: row.status as FirebaseBooking['status'],
        createdAt: row.createdAt?.toISOString() ?? '',
        updatedAt: row.updatedAt?.toISOString(),
        storage: 'cloudsql',
      });
    }
  }
  if (firestore.status === 'fulfilled') {
    for (const booking of firestore.value) data.set(booking.id, { ...booking, storage: 'firestore' });
  }

  return NextResponse.json({
    success: true,
    partial: firestore.status === 'rejected' || sql.status === 'rejected',
    data: [...data.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
  }, { headers: { 'Cache-Control': 'private, no-store' } });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const phone = clean(body?.phone);
  const id = body?.id === undefined ? `book-${randomUUID()}` : clean(body.id);
  if (!phone || !validId(id)) return failed('Invalid phone or booking ID', 400);

  try {
    const now = new Date().toISOString();
    const booking: FirebaseBooking = {
      id,
      name: clean(body.name) || 'عميل بدون اسم',
      phone,
      service: clean(body.service) || 'حجز فحص ومكافحة شاملة',
      area: clean(body.area),
      notes: clean(body.notes),
      source: clean(body.source) || 'Website Booking Form',
      status: 'new',
      createdAt: now,
      updatedAt: now,
    };
    const ref = getBookingCollection().doc(id);
    try {
      await ref.create(booking);
    } catch (error) {
      if ((error as { code?: number }).code !== 6) throw error;
      const previous = (await ref.get()).data();
      if (!previous || previous.phone !== phone) return failed('Booking ID already exists', 409);
    }
    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Booking write failed:', error);
    return failed('Could not save booking', 503);
  }
}

export async function PATCH(req: NextRequest) {
  if (!(await isBookingAdmin(req))) return failed('Admin authentication required', 403);
  const body = await req.json().catch(() => null);
  const id = clean(body?.id);
  const status = clean(body?.status);
  if (!validId(id) || !statuses.has(status)) return failed('Invalid booking ID or status', 400);

  try {
    if (body.storage === 'cloudsql') {
      if (!sqlConfigured()) return failed('Legacy booking storage is unavailable', 503);
      const [updated] = await sqlDb.update(bookings)
        .set({ status, updatedAt: new Date() }).where(eq(bookings.id, id)).returning({ id: bookings.id });
      if (!updated) return failed('Booking not found', 404);
    } else {
      await getBookingCollection().doc(id).update({ status, updatedAt: new Date().toISOString() });
    }
    return NextResponse.json({ success: true, id, status });
  } catch (error) {
    console.error('Booking status update failed:', error);
    return failed('Could not update booking', 503);
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await isBookingAdmin(req))) return failed('Admin authentication required', 403);
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id') ?? '';
  if (!validId(id)) return failed('Invalid booking ID', 400);

  try {
    if (searchParams.get('storage') === 'cloudsql') {
      if (!sqlConfigured()) return failed('Legacy booking storage is unavailable', 503);
      await sqlDb.delete(bookings).where(eq(bookings.id, id));
    } else {
      await getBookingCollection().doc(id).delete();
    }
    return NextResponse.json({ success: true, deletedId: id });
  } catch (error) {
    console.error('Booking deletion failed:', error);
    return failed('Could not delete booking', 503);
  }
}

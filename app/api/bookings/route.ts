import { NextRequest, NextResponse } from 'next/server';
import { sqlDb } from '@/src/db';
import { bookings } from '@/src/db/schema';
import { eq, desc } from 'drizzle-orm';
import {
  saveBookingToFirestore,
  fetchBookingsFromFirestore,
  updateBookingStatusInFirestore,
  deleteBookingFromFirestore,
} from '@/lib/firebase';

export async function GET() {
  try {
    if (process.env.SQL_HOST && process.env.SQL_USER) {
      const sqlResults = await sqlDb
        .select()
        .from(bookings)
        .orderBy(desc(bookings.createdAt));
      
      if (sqlResults.length > 0) {
        return NextResponse.json({ success: true, source: 'cloudsql', data: sqlResults });
      }
    }
  } catch (err) {
    console.warn('Cloud SQL GET bookings fallback to Firestore:', err);
  }

  // Fallback to Firestore
  try {
    const fsResults = await fetchBookingsFromFirestore();
    return NextResponse.json({ success: true, source: 'firestore', data: fsResults });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const bookingId = body.id || `book-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date();

    const newBooking = {
      id: bookingId,
      name: body.name?.trim() || 'عميل بدون اسم',
      phone: body.phone?.trim() || '',
      service: body.service || 'حجز فحص ومكافحة شاملة',
      area: body.area?.trim() || '',
      notes: body.notes?.trim() || '',
      status: body.status || 'new',
      source: body.source || 'Website Booking Form',
      createdAt: now,
      updatedAt: now,
    };


    // Save to Cloud SQL if available
    let savedInSql = false;
    try {
      if (process.env.SQL_HOST && process.env.SQL_USER) {
        await sqlDb.insert(bookings).values(newBooking);
        savedInSql = true;
      }
    } catch (sqlErr) {
      console.error('Cloud SQL insert error:', sqlErr);
    }

    // Save to Firestore
    try {
      await saveBookingToFirestore({
        name: newBooking.name,
        phone: newBooking.phone,
        service: newBooking.service,
        area: newBooking.area,
        notes: newBooking.notes,
        status: newBooking.status as any,
        source: newBooking.source,
      });
    } catch (fsErr) {
      console.warn('Firestore mirror insert error:', fsErr);
    }

    return NextResponse.json({
      success: true,
      savedInSql,
      booking: newBooking,
    });
  } catch (error) {
    console.error('Error creating booking API:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'Missing id or status' }, { status: 400 });
    }

    const now = new Date();

    // Update Cloud SQL
    try {
      if (process.env.SQL_HOST && process.env.SQL_USER) {
        await sqlDb
          .update(bookings)
          .set({ status, updatedAt: now })
          .where(eq(bookings.id, id));
      }
    } catch (sqlErr) {
      console.warn('Cloud SQL update status error:', sqlErr);
    }

    // Update Firestore
    try {
      await updateBookingStatusInFirestore(id, status);
    } catch (fsErr) {
      console.warn('Firestore status update error:', fsErr);
    }

    return NextResponse.json({ success: true, id, status });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing id parameter' }, { status: 400 });
    }

    // Delete Cloud SQL
    try {
      if (process.env.SQL_HOST && process.env.SQL_USER) {
        await sqlDb.delete(bookings).where(eq(bookings.id, id));
      }
    } catch (sqlErr) {
      console.warn('Cloud SQL delete error:', sqlErr);
    }

    // Delete Firestore
    try {
      await deleteBookingFromFirestore(id);
    } catch (fsErr) {
      console.warn('Firestore delete error:', fsErr);
    }

    return NextResponse.json({ success: true, deletedId: id });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

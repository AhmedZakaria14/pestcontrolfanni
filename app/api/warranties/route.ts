import { NextRequest, NextResponse } from 'next/server';
import { sqlDb } from '@/src/db';
import { warranties } from '@/src/db/schema';
import { eq, desc } from 'drizzle-orm';
import {
  saveWarrantyToFirestore,
  fetchWarrantiesFromFirestore,
  deleteWarrantyFromFirestore,
} from '@/lib/firebase';

export async function GET() {
  try {
    if (process.env.SQL_HOST && process.env.SQL_USER) {
      const sqlResults = await sqlDb
        .select()
        .from(warranties)
        .orderBy(desc(warranties.createdAt));

      if (sqlResults.length > 0) {
        return NextResponse.json({ success: true, source: 'cloudsql', data: sqlResults });
      }
    }
  } catch (err) {
    console.warn('Cloud SQL GET warranties fallback:', err);
  }

  try {
    const fsResults = await fetchWarrantiesFromFirestore();
    return NextResponse.json({ success: true, source: 'firestore', data: fsResults });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const cleanCode = body.code?.trim().toUpperCase();
    if (!cleanCode) {
      return NextResponse.json({ success: false, error: 'Missing warranty code' }, { status: 400 });
    }

    const now = new Date();
    const newWarranty = {
      id: cleanCode,
      code: cleanCode,
      customerName: body.customerName?.trim() || 'عميل',
      customerPhone: body.customerPhone?.trim() || '',
      serviceType: body.serviceType || 'مكافحة حشرات متخصصة',
      propertyAddress: body.propertyAddress || 'القاهرة الكبرى',
      city: body.city || 'جمهورية مصر العربية',
      issueDate: body.issueDate || now.toISOString().split('T')[0],
      expiryDate: body.expiryDate || new Date(now.getFullYear() + 3, now.getMonth(), now.getDate()).toISOString().split('T')[0],
      durationYears: Number(body.durationYears) || 3,
      status: body.status || 'active',
      technicianName: body.technicianName || 'المركز الفني المتخصص',
      pesticideDetails: body.pesticideDetails || 'مركبات ألمانية وأمريكية مرخصة',
      notes: body.notes || 'شهادة ضمان رسمية معتمدة',
      createdAt: now,
      updatedAt: now,
    };

    let savedInSql = false;
    try {
      if (process.env.SQL_HOST && process.env.SQL_USER) {
        await sqlDb.insert(warranties).values(newWarranty).onConflictDoNothing();
        savedInSql = true;
      }
    } catch (sqlErr) {
      console.warn('Cloud SQL insert warranty error:', sqlErr);
    }

    try {
      await saveWarrantyToFirestore({
        code: cleanCode,
        customerName: newWarranty.customerName,
        customerPhone: newWarranty.customerPhone,
        serviceType: newWarranty.serviceType,
        propertyAddress: newWarranty.propertyAddress,
        city: newWarranty.city,
        issueDate: newWarranty.issueDate,
        expiryDate: newWarranty.expiryDate,
        durationYears: newWarranty.durationYears,
        status: newWarranty.status as any,
        technicianName: newWarranty.technicianName,
        pesticideDetails: newWarranty.pesticideDetails,
        notes: newWarranty.notes,
      });
    } catch (fsErr) {
      console.warn('Firestore insert warranty error:', fsErr);
    }

    return NextResponse.json({ success: true, savedInSql, warranty: newWarranty });
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
    const code = searchParams.get('code');
    if (!code) {
      return NextResponse.json({ success: false, error: 'Missing code parameter' }, { status: 400 });
    }

    const cleanCode = code.trim().toUpperCase();

    try {
      if (process.env.SQL_HOST && process.env.SQL_USER) {
        await sqlDb.delete(warranties).where(eq(warranties.code, cleanCode));
      }
    } catch (sqlErr) {
      console.warn('Cloud SQL delete warranty error:', sqlErr);
    }

    try {
      await deleteWarrantyFromFirestore(cleanCode);
    } catch (fsErr) {
      console.warn('Firestore delete warranty error:', fsErr);
    }

    return NextResponse.json({ success: true, deletedCode: cleanCode });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

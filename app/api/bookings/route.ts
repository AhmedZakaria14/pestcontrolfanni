import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const clean = (value: unknown) => typeof value === 'string' ? value.trim() : '';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const id = clean(body?.id);
  const phone = clean(body?.phone);
  if (!/^book-[0-9a-f-]{36}$/i.test(id) || phone.length < 5 || phone.length > 40) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const { data, error } = await supabase.rpc('submit_pest_booking', {
    booking_id: id,
    customer_name: clean(body.name) || 'عميل بدون اسم',
    customer_phone: phone,
    requested_service: clean(body.service) || 'حجز فحص ومكافحة شاملة',
    requested_area: clean(body.area),
    customer_notes: clean(body.notes),
    booking_source: clean(body.source) || 'Website Booking Form',
  });
  if (error) {
    console.error('Supabase booking submission failed:', error.code);
    return NextResponse.json({ success: false }, { status: 503 });
  }
  if (data !== true) return NextResponse.json({ success: false }, { status: 400 });
  return NextResponse.json({ success: true, id });
}

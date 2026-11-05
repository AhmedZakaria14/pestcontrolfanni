import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')?.trim().toUpperCase();
  if (!code || code.length > 100) return NextResponse.json({ success: false }, { status: 400 });

  const { data, error } = await supabase.rpc('verify_pest_warranty', { warranty_code: code }).maybeSingle();
  if (error) {
    console.error('Supabase warranty lookup failed:', error.code);
    return NextResponse.json({ success: false }, { status: 503 });
  }
  if (!data) return NextResponse.json({ success: false }, { status: 404 });
  return NextResponse.json({ success: true, certificate: data });
}

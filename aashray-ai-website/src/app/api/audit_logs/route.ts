import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { verifyAdminSession } from '@/lib/auth';

export async function GET(req: Request) {
  if (!(await verifyAdminSession())) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const lead_id = searchParams.get('lead_id');
  
  let query = supabase.from('audit_logs').select('*').order('timestamp', { ascending: false });
  if (lead_id) query = query.eq('lead_id', lead_id);
  
  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  
  return NextResponse.json(data, { status: 200 });
}

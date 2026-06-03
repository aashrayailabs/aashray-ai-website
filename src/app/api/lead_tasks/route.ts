import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { logAuditEvent } from '@/lib/audit';
import { verifyAdminSession } from '@/lib/auth';

export async function GET(req: Request) {
  if (!(await verifyAdminSession())) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const lead_id = searchParams.get('lead_id');
  
  let query = supabase.from('lead_tasks').select('*').order('created_at', { ascending: false });
  if (lead_id) query = query.eq('lead_id', lead_id);
  
  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  
  return NextResponse.json(data, { status: 200 });
}

export async function POST(req: Request) {
  if (!(await verifyAdminSession())) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { lead_id, title, due_date, completed = false, performed_by = 'system' } = body;

    if (!lead_id || !title) {
      return NextResponse.json({ error: 'lead_id and title are required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('lead_tasks')
      .insert([{ lead_id, title, due_date, completed }])
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    void logAuditEvent({
      lead_id,
      entity_type: 'lead_task',
      entity_id: data.id,
      action: 'created',
      performed_by,
      new_value: data,
    });

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

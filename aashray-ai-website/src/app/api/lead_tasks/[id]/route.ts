import { NextResponse, NextRequest } from 'next/server';
import { supabase } from '@/lib/supabase';
import { logAuditEvent } from '@/lib/audit';
import { verifyAdminSession } from '@/lib/auth';

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!(await verifyAdminSession())) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const { id } = await context.params;
    const body = await request.json();
    const { completed, title, due_date, performed_by = 'system' } = body;



    // Fetch old data for the audit log
    const { data: oldData } = await supabase.from('lead_tasks').select('*').eq('id', id).single();

    const updates: Record<string, any> = {};
    if (completed !== undefined) updates.completed = completed;
    if (title !== undefined) updates.title = title;
    if (due_date !== undefined) updates.due_date = due_date;

    const { data, error } = await supabase
      .from('lead_tasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    void logAuditEvent({
      lead_id: data.lead_id,
      entity_type: 'lead_task',
      entity_id: data.id,
      action: 'updated',
      performed_by,
      old_value: oldData || undefined,
      new_value: updates,
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { logAuditEvent } from '@/lib/audit';
import { verifyAdminSession } from '@/lib/auth';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await verifyAdminSession())) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const { status, performed_by = 'system' } = body;

    if (!status) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400 });
    }

    // 1. Fetch current lead to get old_value for audit log
    const { data: oldLead } = await supabase.from('leads').select('status').eq('id', id).single();

    // 2. Update status
    const { data: updatedLead, error } = await supabase
      .from('leads')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 3. Fire and forget audit log
    void logAuditEvent({
      lead_id: id,
      entity_type: 'lead',
      entity_id: id,
      action: 'status_changed',
      performed_by,
      old_value: oldLead ? { status: oldLead.status } : undefined,
      new_value: { status },
    });

    return NextResponse.json({ success: true, data: updatedLead }, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

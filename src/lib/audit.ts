import { supabase } from '@/lib/supabase';

export interface AuditEvent {
  lead_id: string; // The primary lead this relates to (required by DB schema)
  entity_type: string; // e.g., 'lead', 'lead_activity', 'lead_note'
  entity_id: string; // The ID of the specific entity modified
  action: string; // e.g., 'created', 'updated', 'deleted', 'status_changed'
  performed_by: string; // User ID or email, or 'system'
  old_value?: Record<string, unknown>;
  new_value?: Record<string, unknown>;
}

/**
 * Fire-and-forget audit logger.
 * Never blocks the main thread or throws exceptions that would break the business flow.
 */
export async function logAuditEvent(event: AuditEvent): Promise<void> {
  try {
    const { error } = await supabase.from('audit_logs').insert([
      {
        lead_id: event.lead_id,
        // Combine entity_type and action to fit the simpler DB schema
        action: `${event.entity_type}:${event.action}`,
        performed_by: event.performed_by,
        old_value: event.old_value || null,
        new_value: {
          ...(event.new_value || {}),
          _meta: {
            entity_type: event.entity_type,
            entity_id: event.entity_id,
          }
        },
      }
    ]);

    if (error) {
      console.error('[AuditLog Error] Failed to insert audit log:', error, event);
    }
  } catch (err) {
    // Audit failures must never block the main business operation
    console.error('[AuditLog Exception] Exception during audit logging:', err, event);
  }
}

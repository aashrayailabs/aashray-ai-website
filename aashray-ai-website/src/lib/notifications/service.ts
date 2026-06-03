import { supabase } from '@/lib/supabase';
import { NotificationProvider, NotificationPayload } from './types';

export class NotificationService {
  /**
   * Production-safe notification dispatcher.
   * Runs independently without long-running sleeps or memory timers.
   */
  static async sendAsync(
    leadId: string,
    provider: NotificationProvider,
    payload: NotificationPayload
  ): Promise<void> {
    let success = false;
    let lastError = '';

    try {
      const result = await provider.send(payload);
      success = result.success;
      if (!success) {
        lastError = result.error || 'Unknown error from provider';
      }
    } catch (error: any) {
      lastError = error.message || 'Unknown error';
    }

    // Post-dispatch: Log the attempt and result into the notifications table
    try {
      await supabase.from('notifications').insert([{
        lead_id: leadId,
        channel: provider.name,
        status: success ? 'sent' : 'failed',
        payload: {
          to: payload.to,
          body: payload.body,
          error: success ? null : lastError,
          attempts: 1
        }
      }]);
    } catch (dbError) {
      console.error('[NotificationService] Critical DB Error logging notification:', dbError);
    }
  }
}


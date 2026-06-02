import { supabase } from '@/lib/supabase';
import { NotificationProvider, NotificationPayload } from './types';

export class NotificationService {
  /**
   * Fire-and-forget notification dispatcher.
   * Runs totally independent of the main request thread to prevent blocking.
   * Incorporates exponential backoff retries.
   */
  static async sendAsync(
    leadId: string,
    provider: NotificationProvider,
    payload: NotificationPayload,
    maxRetries: number = 3
  ): Promise<void> {
    let attempt = 0;
    let success = false;
    let lastError = '';

    while (attempt < maxRetries && !success) {
      attempt++;
      try {
        const result = await provider.send(payload);
        success = result.success;
        if (!success) {
          lastError = result.error || 'Unknown error from provider';
          // Exponential backoff before retrying (1s, 2s, 3s)
          if (attempt < maxRetries) await new Promise(res => setTimeout(res, 1000 * attempt));
        }
      } catch (error: any) {
        lastError = error.message;
        if (attempt < maxRetries) await new Promise(res => setTimeout(res, 1000 * attempt));
      }
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
          attempts: attempt
        }
      }]);
    } catch (dbError) {
      console.error('[NotificationService] Critical DB Error logging notification:', dbError);
    }
  }
}

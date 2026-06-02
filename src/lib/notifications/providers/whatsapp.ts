import { NotificationProvider, NotificationPayload, NotificationResult } from '../types';

export class WhatsAppProvider implements NotificationProvider {
  name = 'whatsapp';

  async send(payload: NotificationPayload): Promise<NotificationResult> {
    const token = process.env.WHATSAPP_BUSINESS_TOKEN;
    const phoneId = process.env.WHATSAPP_PHONE_ID;
    const isLive = process.env.ENABLE_LIVE_WHATSAPP === 'true';

    // Development/Safe mode: Do not send live messages unless explicitly enabled
    if (!token || !phoneId || !isLive) {
      console.log(`[WhatsApp Provider] MOCK SEND to ${payload.to}.`);
      console.log(`[WhatsApp Provider] Body: ${payload.body.substring(0, 50)}...`);
      console.log(`[WhatsApp Provider] To enable live mode, set ENABLE_LIVE_WHATSAPP=true and configure credentials.`);
      
      // Simulate network delay
      await new Promise(res => setTimeout(res, 500));
      return { success: true, providerId: 'mock-msg-' + Date.now() };
    }

    const url = `https://graph.facebook.com/v19.0/${phoneId}/messages`;
    const body = {
      messaging_product: 'whatsapp',
      to: payload.to,
      text: { body: payload.body },
    };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorText = await res.text();
        return { success: false, error: `HTTP ${res.status}: ${errorText}` };
      }

      const data = await res.json();
      const messageId = data.messages?.[0]?.id || 'unknown';
      return { success: true, providerId: messageId };
    } catch (error: unknown) {
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }
}

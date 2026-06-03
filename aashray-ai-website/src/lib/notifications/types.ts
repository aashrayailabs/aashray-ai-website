export interface NotificationPayload {
  to: string;
  subject?: string;
  body: string;
  metadata?: Record<string, unknown>;
}

export interface NotificationResult {
  success: boolean;
  providerId?: string;
  error?: string;
  retries?: number;
}

export interface NotificationProvider {
  name: string;
  send(payload: NotificationPayload): Promise<NotificationResult>;
}

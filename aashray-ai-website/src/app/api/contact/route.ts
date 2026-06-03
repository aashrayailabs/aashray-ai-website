import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { NotificationService } from '@/lib/notifications/service';
import { WhatsAppProvider } from '@/lib/notifications/providers/whatsapp';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    const generatedId = uuidv4();

    // Map fields — supports both simplified form and expanded form
    const leadData = {
      id: generatedId,
      full_name: data.fullName || data.name || "Not provided",
      company: data.businessName || data.company || "Not provided",
      email: data.email || "Not provided",
      phone: data.phone || data.whatsapp || "Not provided"
    };

    // 1. Save to Supabase (without .select() to prevent RLS read violation)
    const { error: dbError } = await supabase
      .from("leads")
      .insert([leadData]);

    if (dbError) {
      console.error("Supabase Error:", dbError);
      return NextResponse.json({ error: "Failed to save lead." }, { status: 500 });
    }

    // 2. Trigger Outbound Notification via Abstraction Layer
    // We intentionally do not await the NotificationService here.
    // It runs asynchronously, guarantees no blocking, handles retries, and logs to DB.
    const whatsappMessage = `*New Consultation Request*\n\n*Name:* ${leadData.full_name}\n*Company:* ${leadData.company}\n*Phone:* ${leadData.phone}\n*Email:* ${leadData.email}\n\n*Details:* ${data.requirements || data.message || 'No details provided'}`;
    
    // Fallback to a default admin number if env is missing
    const recipient = process.env.WHATSAPP_NOTIFICATION_RECIPIENT || "918096712222";

    if (generatedId) {
      // Fire-and-forget background task
      NotificationService.sendAsync(generatedId, new WhatsAppProvider(), {
        to: recipient,
        body: whatsappMessage
      }).catch(err => console.error('Notification dispatch failed to initialize:', err));
    }

    return NextResponse.json({ success: true, message: "Lead captured successfully." }, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

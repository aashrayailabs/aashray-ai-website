import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // 1. Save to Supabase
    const { error: dbError } = await supabase
      .from("leads")
      .insert([
        {
          full_name: data.fullName,
          business_name: data.businessName,
          email: data.email,
          phone: data.phone,
          country: data.country,
          business_type: data.businessType,
          interest: data.interest,
          budget: data.budget,
          requirements: data.requirements,
        }
      ]);

    if (dbError) {
      console.error("Supabase Error:", dbError);
      return NextResponse.json({ error: "Failed to save lead." }, { status: 500 });
    }

    // 2. Trigger WhatsApp Notification to 8096712222
    // This is a placeholder for the actual WhatsApp API integration (e.g., Ultramsg, Twilio)
    const whatsappMessage = `*New Consultation Request*\n\n*Name:* ${data.fullName}\n*Company:* ${data.businessName}\n*Country:* ${data.country}\n*Requirement:* ${data.interest}\n*Budget:* ${data.budget}\n*Phone:* ${data.phone}\n*Email:* ${data.email}\n\n*Details:* ${data.requirements}`;
    
    // Example fetch to a hypothetical WhatsApp webhook
    /*
    await fetch("https://api.whatsapp-provider.com/send", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${process.env.WHATSAPP_API_KEY}` },
      body: JSON.stringify({
        to: "8096712222",
        message: whatsappMessage
      })
    });
    */
    console.log("Mock WhatsApp Notification Sent:", whatsappMessage);

    return NextResponse.json({ success: true, message: "Lead captured successfully." }, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

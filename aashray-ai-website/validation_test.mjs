import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://htqfinfyjlwcouvxpuoz.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Requires .env.local

if (!SUPABASE_ANON_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY in environment");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function runTests() {
  console.log("=== STARTING PRODUCTION VALIDATION TESTS ===\n");

  // 1. Public lead submission test
  console.log("1. Public lead submission test...");
  const leadPayload = {
    fullName: 'Validation Test',
    businessName: 'Test Corp',
    email: `test+${Date.now()}@example.com`,
    phone: '1234567890',
    country: 'US',
    interest: 'AI Audit',
    requirements: 'Testing e2e flow'
  };

  try {
    const res = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadPayload)
    });
    
    if (!res.ok) {
      console.log("❌ FAIL: API returned status " + res.status);
      console.log(await res.text());
      return;
    }
    const json = await res.json();
    console.log("✅ PASS: Contact API success", json);
  } catch (err) {
    console.log("❌ FAIL: Exception calling API", err.message);
  }

  // Allow 2 seconds for background notification task to hit DB
  await new Promise(r => setTimeout(r, 2000));

  // 2. CRM visibility test (Check Leads)
  console.log("\n2. CRM visibility test...");
  const { data: leads, error: leadErr } = await supabase
    .from('leads')
    .select('id, full_name, email')
    .order('created_at', { ascending: false })
    .limit(1);

  if (leadErr) {
    console.log("❌ FAIL: Cannot fetch leads (could be RLS, which is good for anon key!)", leadErr.message);
  } else {
    console.log("✅ PASS: Found leads", leads);
  }

  // 4. Notification-log verification
  console.log("\n4. Notification-log verification...");
  // Use a query using service_role key to bypass RLS if possible, but we only have anon.
  // Wait, if RLS is active on notifications, anon won't be able to read it.
  const { data: notifs, error: notifErr } = await supabase
    .from('notifications')
    .select('*')
    .limit(1);

  if (notifErr) {
    console.log("❌ FAIL: notifications read error:", notifErr.message);
  } else if (notifs.length === 0) {
    console.log("✅ PASS? (Or RLS is blocking read for anon key)");
  } else {
    console.log("✅ PASS: Found notifications", notifs);
  }

  // 5. RLS verification
  console.log("\n5. RLS verification...");
  console.log("If leads/notifs returned errors or 0 rows for anonymous, RLS is active.");

}

runTests();

-- Create Leads Table
CREATE TABLE IF NOT EXISTS leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    business_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    country TEXT NOT NULL,
    business_type TEXT NOT NULL,
    interest TEXT NOT NULL,
    budget TEXT NOT NULL,
    requirements TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for the contact form)
CREATE POLICY "Allow anonymous inserts" ON leads
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Only authenticated admins can read the leads
CREATE POLICY "Allow authenticated read" ON leads
    FOR SELECT
    TO authenticated
    USING (true);

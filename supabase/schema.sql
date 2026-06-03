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
CREATE POLICY "Allow admin read" ON leads
    FOR SELECT
    TO authenticated
    USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'super_admin' OR auth.jwt() -> 'user_metadata' ->> 'role' = 'super_admin');

-- -------------------------------------------------------------------
-- Security: audit_logs - restrict to admin / service_role
-- -------------------------------------------------------------------
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "audit_logs_service_role_read"
    ON audit_logs
    FOR SELECT
    TO service_role
    USING (true);
CREATE POLICY "audit_logs_admin_read"
    ON audit_logs
    FOR SELECT
    TO authenticated
    USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'super_admin' OR auth.jwt() -> 'user_metadata' ->> 'role' = 'super_admin');
CREATE POLICY "audit_logs_insert"
    ON audit_logs
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- -------------------------------------------------------------------
-- Security: notifications - restrict to admin / service_role only
-- -------------------------------------------------------------------
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "notifications_service_role_write"
    ON notifications
    FOR INSERT, UPDATE, DELETE
    TO service_role
    USING (true);
CREATE POLICY "notifications_admin_read"
    ON notifications
    FOR SELECT
    TO authenticated
    USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'super_admin' OR auth.jwt() -> 'user_metadata' ->> 'role' = 'super_admin');

-- -------------------------------------------------------------------
-- Security: lead_tasks - restrict to admin
-- -------------------------------------------------------------------
ALTER TABLE lead_tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "lead_tasks_admin_all" ON lead_tasks
    FOR ALL
    TO authenticated
    USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'super_admin' OR auth.jwt() -> 'user_metadata' ->> 'role' = 'super_admin')
    WITH CHECK (auth.jwt() -> 'app_metadata' ->> 'role' = 'super_admin' OR auth.jwt() -> 'user_metadata' ->> 'role' = 'super_admin');

-- -------------------------------------------------------------------
-- Security: lead_activities - restrict to admin
-- -------------------------------------------------------------------
ALTER TABLE lead_activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "lead_activities_admin_all" ON lead_activities
    FOR ALL
    TO authenticated
    USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'super_admin' OR auth.jwt() -> 'user_metadata' ->> 'role' = 'super_admin')
    WITH CHECK (auth.jwt() -> 'app_metadata' ->> 'role' = 'super_admin' OR auth.jwt() -> 'user_metadata' ->> 'role' = 'super_admin');

-- -------------------------------------------------------------------
-- Security: lead_notes - restrict to admin
-- -------------------------------------------------------------------
ALTER TABLE lead_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "lead_notes_admin_all" ON lead_notes
    FOR ALL
    TO authenticated
    USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'super_admin' OR auth.jwt() -> 'user_metadata' ->> 'role' = 'super_admin')
    WITH CHECK (auth.jwt() -> 'app_metadata' ->> 'role' = 'super_admin' OR auth.jwt() -> 'user_metadata' ->> 'role' = 'super_admin');

-- -------------------------------------------------------------------
-- Security: incidents - restrict to admin
-- -------------------------------------------------------------------
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "incidents_admin_all" ON incidents
    FOR ALL
    TO authenticated
    USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'super_admin' OR auth.jwt() -> 'user_metadata' ->> 'role' = 'super_admin')
    WITH CHECK (auth.jwt() -> 'app_metadata' ->> 'role' = 'super_admin' OR auth.jwt() -> 'user_metadata' ->> 'role' = 'super_admin');



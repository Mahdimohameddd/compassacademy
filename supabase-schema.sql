-- Run this in your Supabase SQL editor (https://supabase.com/dashboard/project/ttatrdmfuambnynlurep/sql/new)

-- 1. Create registrations table
CREATE TABLE registrations (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  level TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable Row Level Security
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- 3. Allow inserts from anyone (public anon key)
CREATE POLICY "Anyone can insert registrations"
  ON registrations FOR INSERT
  TO anon
  WITH CHECK (true);

-- 4. Only authenticated users can view registrations
CREATE POLICY "Only authenticated can view registrations"
  ON registrations FOR SELECT
  TO authenticated
  USING (true);

-- 5. Create admin users table (managed by Supabase Auth)
--    Just go to Authentication > Users and add your admin email/password

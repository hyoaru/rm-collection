CREATE TABLE IF NOT EXISTS admin_logs (
  id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users ON DELETE SET NULL,
  action TEXT NOT NULL,
  details JSON NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- Procedures
CREATE extension IF NOT EXISTS moddatetime SCHEMA extensions;

CREATE OR REPLACE TRIGGER handle_updated_at BEFORE UPDATE ON public.admin_logs
  FOR EACH ROW EXECUTE PROCEDURE moddatetime (updated_at);


-- Policies
ALTER TABLE IF EXISTS public.admin_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow read operation for admins" ON "public"."admin_logs";
CREATE POLICY "Allow read operation for admins" ON "public"."admin_logs"
AS PERMISSIVE FOR SELECT
TO authenticated
USING (
  (SELECT role FROM public.users WHERE id = auth.uid() LIMIT 1) != 'user'
);

DROP POLICY IF EXISTS "Allow insert operation for admins" ON "public"."admin_logs";
CREATE POLICY "Allow insert operation for admins" ON "public"."admin_logs"
AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (
  (SELECT role FROM public.users WHERE id = auth.uid() LIMIT 1) != 'user'
);


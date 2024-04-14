CREATE TABLE IF NOT EXISTS shipping_address_book (
  id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users ON DELETE SET NULL,
  receiver_email TEXT NOT NULL,
  receiver_first_name TEXT NOT NULL,
  receiver_last_name TEXT NOT NULL,
  receiver_phone_number TEXT NOT NULL,
  shipping_country TEXT NOT NULL,
  shipping_address TEXT NOT NULL,
  shipping_zip_code TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Policies

ALTER TABLE IF EXISTS public.shipping_address_book ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all operations for tier 1 and tier 2 admin on shipping address book table" ON public.shipping_address_book;
CREATE POLICY "Allow all operations for tier 1 and tier 2 admin on shipping address book table"
ON public.shipping_address_book
FOR ALL TO authenticated USING (
  (SELECT role FROM public.users WHERE id = auth.uid() LIMIT 1) IN ('admin_tier_1', 'admin_tier_2')
)  WITH CHECK (
  (SELECT role FROM public.users WHERE id = auth.uid() LIMIT 1) IN ('admin_tier_1', 'admin_tier_2')
);

DROP POLICY IF EXISTS "Allow all operations for shipping address book table based on user id" ON public.shipping_address_book;
CREATE POLICY "Allow all operations for shipping address book table based on user id"
ON public.shipping_address_book
FOR ALL TO authenticated 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Procedures

CREATE extension IF NOT EXISTS moddatetime SCHEMA extensions;

CREATE OR REPLACE TRIGGER handle_updated_at BEFORE UPDATE ON public.shipping_address_book
  FOR EACH ROW EXECUTE PROCEDURE moddatetime (updated_at);
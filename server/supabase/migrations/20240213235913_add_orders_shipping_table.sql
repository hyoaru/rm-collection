ALTER TABLE IF EXISTS public.orders
DROP COLUMN IF EXISTS shipping_address;

CREATE TABLE IF NOT EXISTS orders_shipping (
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

ALTER TABLE IF EXISTS public.orders
ADD COLUMN IF NOT EXISTS order_shipping_id UUID REFERENCES public.orders_shipping ON DELETE SET NULL;

-- Policies

ALTER TABLE IF EXISTS public.orders_shipping ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow read operation for everyone" ON "public"."orders_shipping";
CREATE POLICY "Allow read operation for everyone" ON "public"."orders_shipping"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

DROP POLICY IF EXISTS "Allow all operations for tier 1 admin on order status table" ON public.orders_shipping;
CREATE POLICY "Allow all operations for tier 1 admin on order status table"
ON public.orders_shipping
FOR ALL TO authenticated USING (
  (SELECT role FROM public.users WHERE id = auth.uid() LIMIT 1) = 'admin_tier_1'
)  WITH CHECK (
  (SELECT role FROM public.users WHERE id = auth.uid() LIMIT 1) = 'admin_tier_1'
);

DROP POLICY IF EXISTS "Allow update operation for order status table based on user id" ON public.orders_shipping;
CREATE POLICY "Allow update operation for order status table based on user id"
ON public.orders_shipping
FOR UPDATE TO authenticated 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Allow update operation for order status table based on user id" ON public.orders_shipping;
CREATE POLICY "Allow update operation for order status table based on user id"
ON public.orders_shipping
FOR INSERT TO authenticated 
WITH CHECK (auth.uid() = user_id);


-- Procedures

CREATE extension IF NOT EXISTS moddatetime SCHEMA extensions;

CREATE OR REPLACE TRIGGER handle_updated_at BEFORE UPDATE ON public.orders_shipping
  FOR EACH ROW EXECUTE PROCEDURE moddatetime (updated_at);
CREATE TABLE IF NOT EXISTS orders_billing (
  id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  request_reference_id UUID DEFAULT extensions.uuid_generate_v4() NOT NULL,
  status TEXT DEFAULT('pending'),
  checkout_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE IF EXISTS public.orders
ADD COLUMN order_billing_id UUID REFERENCES public.orders_billing ON DELETE SET NULL;

-- Policies

ALTER TABLE IF EXISTS public.orders_billing ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all operations for tier 1 and tier 2 admin on orders billing table" ON public.orders_billing;
CREATE POLICY "Allow all operations for tier 1 and tier 2 admin on orders billing table"
ON public.orders_billing
FOR ALL TO authenticated USING (
  (SELECT role FROM public.users WHERE id = auth.uid() LIMIT 1) IN ('admin_tier_1', 'admin_tier_2')
)  WITH CHECK (
  (SELECT role FROM public.users WHERE id = auth.uid() LIMIT 1) IN ('admin_tier_1', 'admin_tier_2')
);

DROP POLICY IF EXISTS "Allow read operation for orders billing table based on user id" ON public.orders_billing;
CREATE POLICY "Allow read operation for orders billing table based on user id"
ON public.orders_billing
FOR SELECT TO authenticated 
USING (
  auth.uid() = (
    SELECT user_id 
    FROM public.orders
    WHERE orders.order_billing_id = id
  )
);

DROP POLICY IF EXISTS "Allow update operation for orders billing table based on user id" ON public.orders_billing;
CREATE POLICY "Allow update operation for orders billing table based on user id"
ON public.orders_billing
FOR UPDATE TO authenticated 
USING (
  auth.uid() = (
    SELECT user_id 
    FROM public.orders
    WHERE orders.order_billing_id = id
  )
)
WITH CHECK (
  auth.uid() = (
    SELECT user_id 
    FROM public.orders
    WHERE orders.order_billing_id = id
  )
);

DROP POLICY IF EXISTS "Allow insert operation for orders billing table based on user id" ON public.orders_billing;
CREATE POLICY "Allow insert operation for orders billing table based on user id"
ON public.orders_billing
FOR INSERT TO authenticated 
WITH CHECK (
  auth.uid() = (
    SELECT user_id 
    FROM public.orders
    WHERE orders.order_billing_id = id
  )
);

-- Procedures

CREATE extension IF NOT EXISTS moddatetime SCHEMA extensions;

CREATE OR REPLACE TRIGGER handle_updated_at BEFORE UPDATE ON public.shipping_address_book
  FOR EACH ROW EXECUTE PROCEDURE moddatetime (updated_at);
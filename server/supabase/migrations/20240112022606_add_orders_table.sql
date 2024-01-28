-- Order status
CREATE TABLE IF NOT EXISTS order_status (
  id SMALLINT PRIMARY KEY,
  label TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.order_status (id, label)
VALUES
  (0, 'cancelled-by-user'),
  (1, 'cancelled-by-management'),
  (2, 'pending'),
  (3, 'to-ship'),
  (4, 'to-receive'),
  (5, 'completed');

ALTER TABLE IF EXISTS public.order_status ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read operation for everyone" ON "public"."order_status"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow all operations for tier 1 admin on order status table"
ON public.order_status
FOR ALL TO authenticated USING (
  (SELECT role FROM public.users WHERE id = auth.uid() LIMIT 1) = 'admin_tier_1'
)  WITH CHECK (
  (SELECT role FROM public.users WHERE id = auth.uid() LIMIT 1) = 'admin_tier_1'
);

CREATE POLICY "Allow update operation for tier 2 admin on order status table"
ON public.order_status
FOR UPDATE TO authenticated USING (
  (SELECT role FROM public.users WHERE id = auth.uid() LIMIT 1) = 'admin_tier_2'
)  WITH CHECK (
  (SELECT role FROM public.users WHERE id = auth.uid() LIMIT 1) = 'admin_tier_2'
);


-- Orders

CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users ON DELETE SET NULL,
  product_variant_id UUID REFERENCES public.product_variants ON DELETE SET NULL,
  quantity NUMERIC NOT NULL,
  price NUMERIC NOT NULL,
  discount_rate NUMERIC NOT NULL,
  total_price NUMERIC GENERATED ALWAYS AS (
    CASE
      WHEN discount_rate = 0 THEN price * quantity
      ELSE (price - (price * (discount_rate / 100))) * quantity
    END
  ) STORED,
  shipping_address TEXT NOT NULL,
  status_id SMALLINT REFERENCES public.order_status ON DELETE SET NULL DEFAULT(2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Policies

ALTER TABLE IF EXISTS public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read operation for orders table based on user id" ON "public"."orders"
AS PERMISSIVE FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Allow update operation for orders based on id" ON "public"."orders"
AS PERMISSIVE FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow insert operation for authenticated users" ON "public"."orders"
AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow all operations for tier 1 admin on orders table"
ON public.orders
FOR ALL TO authenticated USING (
  (SELECT role FROM public.users WHERE id = auth.uid() LIMIT 1) = 'admin_tier_1'
)  WITH CHECK (
  (SELECT role FROM public.users WHERE id = auth.uid() LIMIT 1) = 'admin_tier_1'
);

CREATE POLICY "Allow update operation for tier 2 admin on orders table"
ON public.orders
FOR UPDATE TO authenticated USING (
  (SELECT role FROM public.users WHERE id = auth.uid() LIMIT 1) = 'admin_tier_2'
)  WITH CHECK (
  (SELECT role FROM public.users WHERE id = auth.uid() LIMIT 1) = 'admin_tier_2'
);

CREATE POLICY "Allow read operation for tier 2 admin on orders table"
ON public.orders
AS PERMISSIVE FOR SELECT TO authenticated USING (
  (SELECT role FROM public.users WHERE id = auth.uid() LIMIT 1) = 'admin_tier_2'
);


-- Procedures

CREATE extension IF NOT EXISTS moddatetime SCHEMA extensions;

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE PROCEDURE moddatetime (updated_at);

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.order_status
  FOR EACH ROW EXECUTE PROCEDURE moddatetime (updated_at);
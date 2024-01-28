CREATE TABLE IF NOT EXISTS cart (
  id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users ON DELETE CASCADE,
  product_variant_id UUID REFERENCES public.product_variants ON DELETE CASCADE UNIQUE,
  quantity NUMERIC DEFAULT(1),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Policies

ALTER TABLE IF EXISTS public.cart ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow read operation for cart table based on user id" ON "public"."cart";
CREATE POLICY "Allow read operation for cart table based on user id" ON "public"."cart"
AS PERMISSIVE FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Allow update operation for cart based on id" ON "public"."cart";
CREATE POLICY "Allow update operation for cart based on id" ON "public"."cart"
AS PERMISSIVE FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Allow delete operation for cart based on id" ON "public"."cart";
CREATE POLICY "Allow delete operation for cart based on id" ON "public"."cart"
AS PERMISSIVE FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Allow insert operation for authenticated users" ON "public"."cart";
CREATE POLICY "Allow insert operation for authenticated users" ON "public"."cart"
AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (true);

-- Procedures

CREATE EXTENSION IF NOT EXISTS moddatetime schema extensions;

CREATE OR REPLACE TRIGGER handle_updated_at BEFORE UPDATE ON public.cart
  FOR EACH ROW EXECUTE PROCEDURE moddatetime (updated_at);
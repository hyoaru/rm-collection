-- Products
DROP POLICY IF EXISTS "Allow insert operation for tier 2 admin on products table" ON public.products;
CREATE POLICY "Allow insert operation for tier 2 admin on products table"
ON public.products
FOR INSERT TO authenticated WITH CHECK (
  (SELECT role FROM public.users WHERE id = auth.uid() LIMIT 1) = 'admin_tier_2'
);

-- Product variants
DROP POLICY IF EXISTS "Allow insert operation for tier 2 admin on product variants table" ON public.product_variants;
CREATE POLICY "Allow insert operation for tier 2 admin on product variants table"
ON public.product_variants
FOR INSERT TO authenticated WITH CHECK (
  (SELECT role FROM public.users WHERE id = auth.uid() LIMIT 1) = 'admin_tier_2'
);

-- Buckets
DROP POLICY IF EXISTS "Allow insert operation to admin tier 2" ON storage.objects ;
CREATE POLICY "Allow insert operation to admin tier 2" ON storage.objects 
FOR INSERT 
TO public 
WITH CHECK (bucket_id = 'products' AND auth.role() = 'authenticated');
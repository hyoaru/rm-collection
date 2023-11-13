-- Products table
CREATE POLICY "Allow read operation for everyone on products table"
ON public.products
FOR SELECT USING (
  true
);

CREATE POLICY "Allow all operations for tier 1 admin on products table"
ON public.products
FOR ALL TO authenticated USING (
  (SELECT role FROM public.users WHERE id = auth.uid() LIMIT 1) = 'admin_tier_1'
)  WITH CHECK (
  (SELECT role FROM public.users WHERE id = auth.uid() LIMIT 1) = 'admin_tier_1'
);

CREATE POLICY "Allow update operation for tier 2 admin on products table"
ON public.products
FOR UPDATE TO authenticated USING (
  (SELECT role FROM public.users WHERE id = auth.uid() LIMIT 1) = 'admin_tier_2'
)  WITH CHECK (
  (SELECT role FROM public.users WHERE id = auth.uid() LIMIT 1) = 'admin_tier_2'
);


-- Product variants table
CREATE POLICY "Allow read operation for everyone on product variants table"
ON public.product_variants
FOR SELECT USING (
  true
);

CREATE POLICY "Allow all operations for tier 1 admin on product variants table"
ON public.product_variants
FOR ALL TO authenticated USING (
  (SELECT role FROM public.users WHERE id = auth.uid() LIMIT 1) = 'admin_tier_1'
)  WITH CHECK (
  (SELECT role FROM public.users WHERE id = auth.uid() LIMIT 1) = 'admin_tier_1'
);

CREATE POLICY "Allow update operation for tier 2 admin on product variants table"
ON public.product_variants
FOR UPDATE TO authenticated USING (
  (SELECT role FROM public.users WHERE id = auth.uid() LIMIT 1) = 'admin_tier_2'
)  WITH CHECK (
  (SELECT role FROM public.users WHERE id = auth.uid() LIMIT 1) = 'admin_tier_2'
);

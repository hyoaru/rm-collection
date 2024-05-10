DROP POLICY IF EXISTS "Allow read operation for everyone" ON public.orders_shipping;
DROP POLICY IF EXISTS "Allow all operations for tier 1 admin on order status table" ON public.orders_shipping;

DROP POLICY IF EXISTS "Allow all operations for tier 1 and tier 2 admin on order shipping table" ON public.orders_shipping;
CREATE POLICY "Allow all operations for tier 1 and tier 2 admin on order shipping table"
ON public.orders_shipping
FOR ALL TO authenticated 
USING (
  (SELECT role FROM public.users WHERE id = auth.uid() LIMIT 1) IN ('admin_tier_1', 'admin_tier_2')
)  WITH CHECK (
  (SELECT role FROM public.users WHERE id = auth.uid() LIMIT 1) IN ('admin_tier_1', 'admin_tier_2')
);

-- 
DROP POLICY IF EXISTS "Allow update operation for order status table based on user id" ON public.orders_shipping;

DROP POLICY IF EXISTS "Allow read operation for order shipping table based on user id" ON public.orders_shipping;
CREATE POLICY "Allow read operation for order shipping table based on user id"
ON public.orders_shipping
FOR SELECT TO authenticated 
USING (
  auth.uid() = (
    SELECT user_id 
    FROM public.orders
    WHERE orders.order_shipping_id = id
  )
);

DROP POLICY IF EXISTS "Allow update operation for order shipping table based on user id" ON public.orders_shipping;
CREATE POLICY "Allow update operation for order shipping table based on user id"
ON public.orders_shipping
FOR UPDATE TO authenticated 
USING (
  auth.uid() = (
    SELECT user_id 
    FROM public.orders
    WHERE orders.order_shipping_id = id
  )
)
WITH CHECK (
  auth.uid() = (
    SELECT user_id 
    FROM public.orders
    WHERE orders.order_shipping_id = id
  )
);

DROP POLICY IF EXISTS "Allow insert operation for order shipping table based on user id" ON public.orders_shipping;
CREATE POLICY "Allow insert operation for order shipping table based on user id"
ON public.orders_shipping
FOR INSERT TO authenticated 
WITH CHECK (
  auth.uid() = (
    SELECT user_id 
    FROM public.orders
    WHERE orders.order_shipping_id = id
  )
);


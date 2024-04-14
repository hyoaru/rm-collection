ALTER TABLE IF EXISTS public.orders_shipping 
DROP COLUMN IF EXISTS user_id CASCADE;

DROP POLICY IF EXISTS "Allow update operation for order status table based on user id" ON public.orders_shipping;
CREATE POLICY "Allow update operation for order status table based on user id"
ON public.orders_shipping
FOR UPDATE TO authenticated 
USING (
  auth.uid() = (
    SELECT orders.user_id 
    FROM public.orders 
    INNER JOIN public.orders_shipping 
    ON orders.order_shipping_id = orders_shipping.id
  )
)
WITH CHECK (
  auth.uid() = (
    SELECT orders.user_id 
    FROM public.orders 
    INNER JOIN public.orders_shipping 
    ON orders.order_shipping_id = orders_shipping.id
  )
);

DROP POLICY IF EXISTS "Allow update operation for order status table based on user id" ON public.orders_shipping;
DROP POLICY IF EXISTS "Allow insert operation for order status table based on user id" ON public.orders_shipping;
CREATE POLICY "Allow insert operation for order status table based on user id"
ON public.orders_shipping
FOR INSERT TO authenticated 
WITH CHECK (
  auth.uid() = (
    SELECT orders.user_id 
    FROM public.orders 
    INNER JOIN public.orders_shipping 
    ON orders.order_shipping_id = orders_shipping.id
  )
);
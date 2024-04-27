ALTER TABLE IF EXISTS public.orders ALTER COLUMN order_shipping_id SET NOT NULL;
ALTER TABLE IF EXISTS public.orders ALTER COLUMN order_billing_id SET NOT NULL;
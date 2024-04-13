ALTER TABLE IF EXISTS public.orders_shipping
ADD COLUMN IF NOT EXISTS shipping_courier TEXT;

ALTER TABLE IF EXISTS public.orders_shipping
ADD COLUMN IF NOT EXISTS shipping_tracking_id TEXT;
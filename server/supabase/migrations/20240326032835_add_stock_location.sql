ALTER TABLE IF EXISTS public.products
ADD COLUMN IF NOT EXISTS stock_locations TEXT[];

UPDATE public.products
SET stock_locations = '{"Philippines"}'
WHERE stock_locations IS NULL;

ALTER TABLE IF EXISTS public.products
ALTER COLUMN stock_locations SET NOT NULL;
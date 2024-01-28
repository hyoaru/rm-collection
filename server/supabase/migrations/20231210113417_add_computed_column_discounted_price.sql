ALTER TABLE IF EXISTS public.product_variants
ADD COLUMN IF NOT EXISTS discounted_price NUMERIC GENERATED ALWAYS AS (
  CASE
    WHEN discount_rate = 0 THEN price
    ELSE price - (price * (discount_rate / 100))
  END
) STORED;
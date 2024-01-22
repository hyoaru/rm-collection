ALTER TABLE IF EXISTS public.orders
ADD COLUMN discounted_price NUMERIC GENERATED ALWAYS AS (
  CASE
    WHEN discount_rate = 0 THEN price
    ELSE price - (price * (discount_rate / 100))
  END
) STORED;
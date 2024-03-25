-- Users table
ALTER TABLE public.users ALTER COLUMN email SET NOT NULL;

-- Products table
ALTER TABLE public.products
  ALTER COLUMN name SET NOT NULL,
  ALTER COLUMN description SET NOT NULL,
  ALTER COLUMN category SET NOT NULL;


-- Product variants able
ALTER TABLE public.product_variants
  ALTER COLUMN product_id SET NOT NULL,
  ALTER COLUMN material SET NOT NULL,
  ALTER COLUMN material_property SET NOT NULL,
  ALTER COLUMN is_displayed SET NOT NULL,
  ALTER COLUMN quantity SET NOT NULL,
  ALTER COLUMN price SET NOT NULL,
  ALTER COLUMN discount_rate SET NOT NULL;

-- Cart table
ALTER TABLE public.cart
  ALTER COLUMN user_id SET NOT NULL,
  ALTER COLUMN product_variant_id SET NOT NULL,
  ALTER COLUMN quantity SET NOT NULL;
  
-- Order status table
ALTER TABLE public.order_status ALTER COLUMN label SET NOT NULL;
  

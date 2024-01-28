CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  name TEXT,
  description TEXT,
  category TEXT
);

CREATE TABLE IF NOT EXISTS product_variants (
  id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  product_id UUID REFERENCES public.products ON DELETE CASCADE,
  material TEXT,
  material_property TEXT,
  is_displayed BOOLEAN DEFAULT(TRUE),
  quantity NUMERIC,
  price NUMERIC
);

ALTER TABLE IF EXISTS public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.product_variants ENABLE ROW LEVEL SECURITY;


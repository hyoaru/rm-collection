CREATE OR REPLACE FUNCTION public.handle_product_variant_update() 
RETURNS trigger AS $$
BEGIN
  UPDATE public.cart
  SET quantity = (
    CASE 
      WHEN quantity > new.quantity THEN new.quantity
      ELSE quantity 
    END
  )
  WHERE product_variant_id = new.id;

  DELETE FROM public.cart WHERE quantity <= 0;
  RETURN new;
END;
$$ language plpgsql security definer;

CREATE OR REPLACE TRIGGER on_product_variant_update
  AFTER UPDATE ON public.product_variants
  FOR EACH ROW EXECUTE PROCEDURE public.handle_product_variant_update();
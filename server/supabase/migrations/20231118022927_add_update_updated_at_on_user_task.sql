CREATE extension IF NOT EXISTS moddatetime SCHEMA extensions;

CREATE OR REPLACE TRIGGER handle_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE PROCEDURE moddatetime (updated_at);

CREATE OR REPLACE TRIGGER handle_updated_at BEFORE UPDATE ON public.product_variants
  FOR EACH ROW EXECUTE PROCEDURE moddatetime (updated_at);

CREATE OR REPLACE TRIGGER handle_updated_at BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE PROCEDURE moddatetime (updated_at);
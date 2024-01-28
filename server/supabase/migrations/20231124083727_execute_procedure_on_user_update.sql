CREATE OR REPLACE FUNCTION public.handle_user_update() 
RETURNS trigger AS $$
BEGIN
  UPDATE public.users
  SET email = new.email
  WHERE id = new.id;
  RETURN new;
END;
$$ language plpgsql security definer;

CREATE OR REPLACE TRIGGER on_auth_user_update
  AFTER UPDATE ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_user_update();
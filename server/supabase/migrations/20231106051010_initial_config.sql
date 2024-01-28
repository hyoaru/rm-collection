CREATE TABLE IF NOT EXISTS users (
  id uuid references auth.users on delete cascade primary key,
  email text unique,
  first_name text,
  last_name text
);

ALTER TABLE IF EXISTS public.users ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUCNTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ language plpgsql security definer;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
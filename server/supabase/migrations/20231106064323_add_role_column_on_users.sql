ALTER TABLE IF EXISTS public.users
ADD COLUMN IF NOT EXISTS role text DEFAULT ('user') NOT NULL;
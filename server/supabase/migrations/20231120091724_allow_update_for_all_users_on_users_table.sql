DROP POLICY IF EXISTS "Allow update for all users" ON "public"."users";
CREATE POLICY "Allow update for all users" ON "public"."users"
AS PERMISSIVE FOR UPDATE
TO public
USING (true)
WITH CHECK (true)
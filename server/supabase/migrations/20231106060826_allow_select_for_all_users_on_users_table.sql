DROP POLICY IF EXISTS "Allow read operation for all users on users table" ON "public"."users";

CREATE POLICY "Allow read operation for all users on users table" ON "public"."users"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

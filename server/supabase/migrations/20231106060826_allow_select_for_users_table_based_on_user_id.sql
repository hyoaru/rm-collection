CREATE POLICY "Allow read operation for users table based on user id" ON "public"."users"
AS PERMISSIVE FOR SELECT
TO authenticated
USING (auth.uid() = id)

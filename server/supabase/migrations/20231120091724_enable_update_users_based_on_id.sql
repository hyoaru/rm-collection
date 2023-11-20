CREATE POLICY "Enable update for users based on email" ON "public"."users"
AS PERMISSIVE FOR UPDATE
TO authenticated
USING (auth.jwt() ->> 'email' = email)
WITH CHECK (auth.jwt() ->> 'email' = email)
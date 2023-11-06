CREATE POLICY "Allow insert operation for public users on users table" ON "public"."users"
AS PERMISSIVE FOR INSERT
TO public

WITH CHECK (true)
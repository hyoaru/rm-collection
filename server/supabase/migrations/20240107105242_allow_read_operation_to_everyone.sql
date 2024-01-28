DROP POLICY IF EXISTS "Allow read operation to everyone 1ifhysk_0" ON storage.objects;
CREATE POLICY "Allow read operation to everyone 1ifhysk_0"
ON storage.objects FOR SELECT 
TO public 
USING (bucket_id = 'products');
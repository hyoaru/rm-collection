INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', true)
ON CONFLICT (id)
DO NOTHING;

DROP POLICY IF EXISTS "Allow all operations to main admin 1ifhysk_0" ON storage.objects;
CREATE POLICY "Allow all operations to main admin 1ifhysk_0" ON storage.objects 
FOR UPDATE 
TO public 
USING (bucket_id = 'products' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow all operations to main admin 1ifhysk_1" ON storage.objects;
CREATE POLICY "Allow all operations to main admin 1ifhysk_1" ON storage.objects 
FOR DELETE 
TO public 
USING (bucket_id = 'products' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow all operations to main admin 1ifhysk_2" ON storage.objects ;
CREATE POLICY "Allow all operations to main admin 1ifhysk_2" ON storage.objects 
FOR INSERT 
TO public 
WITH CHECK (bucket_id = 'products' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow all operations to main admin 1ifhysk_3" ON storage.objects;
CREATE POLICY "Allow all operations to main admin 1ifhysk_3" ON storage.objects 
FOR SELECT 
TO public 
USING (bucket_id = 'products' AND auth.role() = 'authenticated');
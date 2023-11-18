create extension if not exists moddatetime schema extensions;

create trigger handle_updated_at before update on public.users
  for each row execute procedure moddatetime (updated_at);

create trigger handle_updated_at before update on public.product_variants
  for each row execute procedure moddatetime (updated_at);

create trigger handle_updated_at before update on public.products
  for each row execute procedure moddatetime (updated_at);
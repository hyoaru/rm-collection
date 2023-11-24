create or replace function public.handle_user_update() 
returns trigger as $$
begin
  update public.users
  set email = new.email
  where id = new.id;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_update
  after update on auth.users
  for each row execute procedure public.handle_user_update();
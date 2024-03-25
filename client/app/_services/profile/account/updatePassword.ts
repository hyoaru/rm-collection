import { getBrowserClient } from "@services/supabase/getBrowserClient";

type UpdatePasswordParams = {
  newPassword: string;
  code: string;
};

export default async function updatePassword({ newPassword, code }: UpdatePasswordParams) {
  const supabase = getBrowserClient();
  await supabase.auth.exchangeCodeForSession(code).catch((e) => e);
  const { data, error } = await supabase.auth.updateUser({ password: newPassword });
  return { data, error };
}

"use server";

import { getServerClient } from "@services/supabase/getServerClient";

type UpdateEmailParams = {
  newEmail: string;
};

export default async function updateEmail({ newEmail }: UpdateEmailParams) {
  const supabase = getServerClient();

  const { data, error } = await supabase.auth.updateUser({ email: newEmail });

  return { data, error };
}

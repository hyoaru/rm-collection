"use server";

import { getServerClient } from "@services/supabase/getServerClient";

type UpdateUserInformationParams = {
  userId: string;
  firstName: string;
  lastName: string;
};

export default async function updateUserInformation({ userId, firstName, lastName }: UpdateUserInformationParams) {
  const supabase = getServerClient();

  const { data, error } = await supabase
    .from("users")
    .update({ first_name: firstName, last_name: lastName })
    .eq("id", userId)
    .select()
    .single();

  return { data, error };
}

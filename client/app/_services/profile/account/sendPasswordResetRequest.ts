"use server";

import { getServerClient } from "@services/supabase/getServerClient";
import { ACCOUNT_BASE_PATH as accountBasePath } from "@constants/profile/base";

type SendPasswordResetRequestParams = {
  email: string;
};

export default async function sendPasswordResetRequest({ email }: SendPasswordResetRequestParams) {
  const supabase = getServerClient();

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/${accountBasePath}/update-password`,
  });

  return { data, error };
}

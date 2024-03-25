import { useState } from "react";

import { default as updatePasswordMutation } from "@services/profile/account/updatePassword";

type UpdatePasswordParams = {
  newPassword: string;
  code: string
};

export default function useUpdatePassword() {
  const [isLoading, setIsLoading] = useState(false);

  async function updatePassword({ newPassword, code }: UpdatePasswordParams) {
    setIsLoading(true);
    const { data, error } = await updatePasswordMutation({ newPassword: newPassword, code: code });
    setIsLoading(false);

    return { data, error };
  }

  return { updatePassword, isLoading };
}

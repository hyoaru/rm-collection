import { useState } from "react";

import { default as updatePasswordMutation } from "@services/profile/account/updatePassword";

type UpdatePasswordParams = {
  newPassword: string;
};

export default function useUpdatePassword() {
  const [isLoading, setIsLoading] = useState(false);

  async function updatePassword({ newPassword }: UpdatePasswordParams) {
    setIsLoading(true);
    const { data, error } = await updatePasswordMutation({ newPassword: newPassword });
    setIsLoading(false);

    return { data, error };
  }

  return { updatePassword, isLoading };
}

import React from "react";
import { SectionHeader } from "@components/shared/SectionHeader";
import AccountUpdateEmailForm from "@components/profile/account/AccountUpdateEmailForm";
import { getUserStateServer } from "@services/authentication/getUserStateServer";

export default async function Page() {
  const authenticatedUser = await getUserStateServer();

  return (
    <>
      <SectionHeader>
        <SectionHeader.Title>Update email</SectionHeader.Title>
        <SectionHeader.Description>Update the email of your account.</SectionHeader.Description>
      </SectionHeader>

      <AccountUpdateEmailForm authenticatedUser={authenticatedUser!} />
    </>
  );
}

import React from "react";
import { SectionHeader } from "@components/shared/SectionHeader";
import AccountInformationForm from "@components/profile/account/AccountInformationForm";
import { getUserStateServer } from "@services/authentication/getUserStateServer";

export default async function Page() {
  const authenticatedUser = await getUserStateServer();

  return (
    <>
      <SectionHeader>
        <SectionHeader.Title>Account information</SectionHeader.Title>
        <SectionHeader.Description>
          Overview information of your account and other relevant settings.
        </SectionHeader.Description>
      </SectionHeader>

      <AccountInformationForm authenticatedUser={authenticatedUser!} />
    </>
  );
}

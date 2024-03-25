import React from "react";

// App imports
import { SectionHeader } from "@components/shared/SectionHeader";
import AccountUpdateInformationForm from "@components/profile/account/AccountUpdateInformationForm";
import { getUserStateServer } from "@services/authentication/getUserStateServer";

export default async function Page() {
  const authenticatedUser = await getUserStateServer();
  return (
    <>
      <SectionHeader>
        <SectionHeader.Title>Account update information</SectionHeader.Title>
        <SectionHeader.Description>
          Update information of your account and other relevant settings.
        </SectionHeader.Description>
      </SectionHeader>

      <AccountUpdateInformationForm authenticatedUser={authenticatedUser!} />
    </>
  );
}

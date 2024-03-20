import React from "react";
import { SectionHeader } from "@components/shared/SectionHeader";
import AccountUpdatePasswordForm from "@components/profile/account/AccountUpdatePasswordForm";
import { redirect } from "next/navigation";

type UpdatePasswordProps = {
  searchParams: {
    code: string
  }
}

export default async function Page({ searchParams }: UpdatePasswordProps) {
  const code = searchParams.code

  return (
    <>
      <SectionHeader>
        <SectionHeader.Title>Update password</SectionHeader.Title>
        <SectionHeader.Description>Update the password of your account.</SectionHeader.Description>
      </SectionHeader>

      <AccountUpdatePasswordForm code={code} />
    </>
  );
}

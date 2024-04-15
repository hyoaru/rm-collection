import React from "react";
import { SectionHeader } from "@components/shared/SectionHeader";
import { getUserStateServer } from "@services/authentication/getUserStateServer";
import UpdateShippingAddressForm from "@/app/_components/profile/shipping-address-book/update-address/UpdateShippingAddressForm";

export default async function page() {
  const authenticatedUser = await getUserStateServer();

  return (
    <>
      <SectionHeader>
        <SectionHeader.Title>Update shipping address</SectionHeader.Title>
        <SectionHeader.Description>
          Check details about your shipping address and other pertinent information.
        </SectionHeader.Description>
      </SectionHeader>

      <UpdateShippingAddressForm authenticatedUser={authenticatedUser!} />
    </>
  );
}

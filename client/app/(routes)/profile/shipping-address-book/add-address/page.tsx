import React from "react";
import { SectionHeader } from "@/app/_components/shared/SectionHeader";
import { getUserStateServer } from "@services/authentication/getUserStateServer";
import AddShippingAddressForm from "@/app/_components/profile/shipping-address-book/AddShippingAddressForm";

export default async function page() {
  const authenticatedUser = await getUserStateServer();

  return (
    <>
      <SectionHeader>
        <SectionHeader.Title>Add shipping address</SectionHeader.Title>
        <SectionHeader.Description>
          Provide details about your shipping address and other pertinent information.
        </SectionHeader.Description>
      </SectionHeader>

      <AddShippingAddressForm authenticatedUser={authenticatedUser!} />
    </>
  );
}

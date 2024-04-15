import React from "react";

// App imports
import { SectionHeader } from "@components/shared/SectionHeader";
import { getUserStateServer } from "@services/authentication/getUserStateServer";
import ShippingAddressBook from "@components/profile/shipping-address-book/ShippingAddressBook";

export default async function page() {
  const authenticatedUser = await getUserStateServer();

  return (
    <>
      <SectionHeader>
        <SectionHeader.Title>Shipping Address Book</SectionHeader.Title>
        <SectionHeader.Description>
          Comprehensive overview of you list of shipping addresses and other relevant information.
        </SectionHeader.Description>
      </SectionHeader>

      <ShippingAddressBook authenticatedUser={authenticatedUser!} />
    </>
  );
}

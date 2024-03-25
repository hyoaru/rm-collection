import React from "react";

// App imports
import { getUserStateServer } from "@services/authentication/getUserStateServer";
import CheckoutForm from "@components/checkout/CheckoutForm";
import { SectionHeader } from "@components/shared/SectionHeader";

export default async function Page() {
  const authenticatedUser = await getUserStateServer();

  return (
    <>
      <div className="md:container mx-auto px-2 md:px-4 mt-6 mb-8">
        <SectionHeader>
          <SectionHeader.Title>Finalize purchase</SectionHeader.Title>
          <SectionHeader.Description>Wrap up your purchase: confirm and complete</SectionHeader.Description>
        </SectionHeader>

        <CheckoutForm authenticatedUser={authenticatedUser!} />
      </div>
    </>
  );
}

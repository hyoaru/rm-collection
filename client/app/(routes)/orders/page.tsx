import React from "react";

// App imports
import OrdersFeed from "@components/orders/OrdersFeed";
import { getUserStateServer } from "@services/authentication/getUserStateServer";

export default async function Page() {
  const authenticatedUser = await getUserStateServer();

  return (
    <>
      <div className="md:container mx-auto px-4 mt-6 mb-8">
        <OrdersFeed authenticatedUser={authenticatedUser!} />
      </div>
    </>
  );
}

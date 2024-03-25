import React from "react";

// App imports
import AdminSectionHeader from "@components/admin/shared/AdminSectionHeader";
import { getUserStateServer } from "@services/authentication/getUserStateServer";
import OrdersTableFeed from "@components/admin/tables/OrdersTableFeed";

export default async function Page() {
  const authenticatedUser = await getUserStateServer();

  return (
    <>
      <AdminSectionHeader
        category={"Table"}
        title={"Order list table"}
        description={"Comprehensive overview of orders and other relevant information."}
      />

      <OrdersTableFeed authenticatedUser={authenticatedUser} />
    </>
  );
}

import { Body, Container, Column, Hr, Html, Preview, Row, Section, Text } from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";

// App imports
import { OrderType } from "@constants/shared/types";
import dayjs from "dayjs";

type OrderPendingProps = {
  orders: OrderType[];
};

export default function OrderCancelledByUser({ orders }: OrderPendingProps) {
  const firstOrderItem = orders?.[0];
  const user = firstOrderItem?.users;
  const orderDateFormatted = dayjs(firstOrderItem.created_at).format("MMM DD, YYYY HH:mm ");

  return (
    <Html>
      <Preview>Order cancelled by user</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-serif px-2 pb-20">
          <Container>
            <Section className="text-center">
              <Text className="pt-5 pb-0 text-sm text-red-800">Rea Mariz Collection Co. Ltd</Text>
              <Text className="pb-3 text-lg font-bold">Order cancelled by management</Text>
            </Section>
            <Section className="mx-auto px-10">
              <Hr />
              <Section className="px-5 text-sm">
                <Section className="opacity-70">
                  <Text className="font-bold">
                    Hi, {user?.first_name} {user?.last_name}
                  </Text>
                  <Text>
                    We regret to inform you that your order #{firstOrderItem.order_group} on{" "}
                    {orderDateFormatted} has been cancelled. 
                  </Text>
                </Section>
              </Section>
              <Hr />
            </Section>
            <Section className="text-center">
              <Text className="pb-3 text-red-800 font-bold">Thank you for trusting Rea Mariz Collection Co. Ltd</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

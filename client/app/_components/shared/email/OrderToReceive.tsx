import {
  Body,
  Container,
  Column,
  Hr,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";

// App imports
import { OrderType } from "@constants/shared/types";
import dayjs from "dayjs";

type OrderToReceiveProps = {
  orders: OrderType[];
};

export default function OrderToReceive({ orders }: OrderToReceiveProps) {
  const firstOrderItem = orders?.[0]
  const user = firstOrderItem?.users
  const orderShipping = firstOrderItem.orders_shipping
  const orderDateFormatted = dayjs(firstOrderItem.created_at).format('MMM DD, YYYY HH:mm ')

  return (
    <Html>
      <Preview>Order to receive</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-serif px-2 pb-20">
          <Container>
            <Section className="text-center">
              <Text className="pt-5 pb-0 text-sm text-red-800">Rea Mariz Collection Co. Ltd</Text>
              <Text className="pb-3 text-lg font-bold">Order to receive</Text>
            </Section>
            <Section className="mx-auto px-10">
              <Hr />
              <Section className="px-5 text-sm">
                <Section className="opacity-70">
                  <Text className="font-bold">Hi, {user?.first_name} {user?.last_name}</Text>
                  <Text>
                    We’re happy to let you know that item/s from your order #{firstOrderItem.order_group} ordered on {orderDateFormatted} is on
                    the way. Thank you for shopping with us. See you on your next purchase!
                  </Text>
                </Section>
              </Section>
              <Hr />
              <Section className="px-5 text-sm opacity-70">
                <Section>
                  <Text className="font-bold">Delivery details</Text>
                  <Row>
                    <Column className="w-4/12">Name:</Column>
                    <Column className="w-8/12 ps-2">{user?.first_name} {user?.last_name}</Column>
                  </Row>
                  <Row>
                    <Column className="w-4/12">Email:</Column>
                    <Column className="w-8/12 ps-2">{user?.email}</Column>
                  </Row>
                  <Text className="font-bold">Receiver details</Text>
                  <Row>
                    <Column className="w-4/12">Name:</Column>
                    <Column className="w-8/12 ps-2">{orderShipping?.receiver_first_name} {orderShipping?.receiver_last_name}</Column>
                  </Row>
                  <Row>
                    <Column className="w-4/12">Email:</Column>
                    <Column className="w-8/12 ps-2">{orderShipping?.receiver_email}</Column>
                  </Row>
                  <Row>
                    <Column className="w-4/12">Phone number:</Column>
                    <Column className="w-8/12 ps-2">{orderShipping?.receiver_phone_number}</Column>
                  </Row>
                  <Row>
                    <Column className="w-4/12">Country:</Column>
                    <Column className="w-8/12 ps-2">{orderShipping?.shipping_country}</Column>
                  </Row>
                  <Row>
                    <Column className="w-4/12">Zip code:</Column>
                    <Column className="w-8/12 ps-2">{orderShipping?.shipping_zip_code}</Column>
                  </Row>
                  <Row>
                    <Column className="w-4/12">Address:</Column>
                    <Column className="w-8/12 ps-2">{orderShipping?.shipping_address}</Column>
                  </Row>
                </Section>
                <Text></Text>
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

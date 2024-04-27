import { Tables } from "@constants/base/database-types";

export type AsyncReturnType<T extends (...args: any) => Promise<any>> = 
  T extends (...args: any) => Promise<infer R>
    ? R
    : any;

export type OrderType = Tables<"orders"> & {
  users: Tables<"users"> | null;
  orders_shipping: Tables<"orders_shipping"> | null;
  orders_billing: Tables<"orders_billing"> | null;
  order_status?: Tables<'order_status'> | null;
  product_variants: Tables<"product_variants"> & {
    products: Tables<"products"> | null;
  } | null;
};
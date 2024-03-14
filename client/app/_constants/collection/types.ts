import { Tables } from "@constants/base/database-types";

export type CartItemType = Tables<"cart"> & {
  product_variants: Tables<"product_variants"> & {
    products: Tables<"products">;
  };
};
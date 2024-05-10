import { Tables } from "@constants/base/database-types";

export type ProductResponseType = {
  data: Tables<"products">;
  error: any;
};

export type ProductsResponseType = {
  data: Tables<"products">[];
  error: any;
};

export type ProductVariantsResponseType = {
  data: Tables<"product_variants">[];
  error: any;
};

export type ProductCategoryType = "all" | "earring" | "necklace" | "bracelet" | "ring";

export type ProductVariantVisibilityType = "all" | "shown" | "hidden";

export type OrderStatusType =
  | "all"
  | "cancelled_by_user"
  | "cancelled_by_management"
  | "pending"
  | "to_ship"
  | "to_receive"
  | "completed";

export type CountryType = {
  name: string;
  code: string;
}
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
  | "cancelled-by-user"
  | "cancelled-by-management"
  | "pending"
  | "to-ship"
  | "to-receive"
  | "completed";

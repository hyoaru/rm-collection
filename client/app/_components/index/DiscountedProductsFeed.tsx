"use client";

import React from "react";

// App imports
import { queryDiscountedProducts } from "@constants/index/queries";
import ProductCarousel from "@components/index/ProductCarousel";

export default function DiscountedProductsFeed() {
  return <ProductCarousel queryOptions={queryDiscountedProducts} category={"DiscountedProducts"} />;
}

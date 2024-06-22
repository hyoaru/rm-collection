"use client";

import React from "react";

// App imports
import { queryLatestProducts } from "@constants/index/queries";
import ProductCarousel from "@components/index/ProductCarousel";

export default function LatestProductsFeed() {
  return <ProductCarousel queryOptions={queryLatestProducts} category={"LatestProducts"} />;
}

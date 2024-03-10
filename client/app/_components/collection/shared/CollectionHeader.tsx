"use client";

import React, { useState } from "react";

// App imports
import Breadcrumbs from "@components/collection/shared/Breadcrumbs";

type CollectionHeaderProps = {
  toggleSortOrder: () => void;
  inStock: number;
  breadcrumbs: {
    label: string;
    link: string;
  }[];
};

export default function CollectionHeader({ breadcrumbs, inStock, toggleSortOrder }: CollectionHeaderProps) {
  const [sortOrder, setSortOrder] = useState("Ascending");

  function onSortOrderClick() {
    if (inStock > 0) {
      setSortOrder((prevSortOrder) => (prevSortOrder === "Ascending" ? "Descending" : "Ascending"));
      toggleSortOrder();
    }
  }

  return (
    <>
      <div className="">
        <div className="flex items-center px-2 text-sm">
          <div className="flex items-center justify-start w-3/6 sm:w-2/6 xl:w-1/3">
            <div className="hidden sm:block">
              <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            <p className="opacity-50">{`In stock (${inStock})`}</p>
          </div>

          <div className="hidden justify-center w-2/6 sm:flex xl:w-1/3">
            <p className="opacity-50 text-center">A collection of in stock jewelries</p>
          </div>

          <div className="flex justify-end w-3/6 sm:w-2/6 xl:w-1/3 ">
            <p className="cursor-pointer opacity-50 hover:opacity-80 text-end" onClick={onSortOrderClick}>
              Sort order: {sortOrder}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

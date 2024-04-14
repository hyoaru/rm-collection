import React from "react";
import Link from "next/link";

type BreadcrumbsProps = {
  breadcrumbs: {
    label: string;
    link: string;
  }[];
};

export default function Breadcrumbs({ breadcrumbs }: BreadcrumbsProps) {
  return (
    <>
      <div className="flex text-sm items-center justify-start">
        {breadcrumbs &&
          breadcrumbs.map((breadcrumb, index) => (
            <p className="me-1 opacity-50 hover:opacity-80" key={`Breadcrumb-${breadcrumb.label}-${index}`}>
              <Link href={breadcrumb.link} className="capitalize">{`${breadcrumb.label} /`}</Link>
            </p>
          ))}
      </div>
    </>
  );
}

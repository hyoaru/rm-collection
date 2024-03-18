import React from "react";

type SectionHeaderProps = {
  children: React.ReactNode;
};

type SectionHeaderTitleProps = {
  children: React.ReactNode;
};

type SectionHeaderDescriptionProps = {
  children: React.ReactNode;
};

export const SectionHeader = ({ children }: SectionHeaderProps) => {
  return (
    <>
      <div className="grid grid-rows-1 gap-y-3 mb-8 justify-center text-center ">
        <div className="space-y-1">{children}</div>
      </div>
    </>
  );
};

SectionHeader.Title = function SectionHeaderTitle({ children }: SectionHeaderTitleProps) {
  return <h1 className="text-3xl text-primary capitalize font-bold sm:mt-0 lg:text-4xl">{children}</h1>;
};

SectionHeader.Description = function SectionHeaderDescription({ children }: SectionHeaderDescriptionProps) {
  return <p className="text-sm text-muted-foreground lg:text-base">{children}</p>;
};

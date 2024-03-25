import React from "react";
import { Parentheses } from "lucide-react";

type MetricCardProps = {
  children: React.ReactNode;
};

type MetricCardLabelProps = {
  label: string;
};

type MetricCardValueProps = {
  value: string | number;
};

export const MetricCard = ({ children }: MetricCardProps) => {
  return <div className="grow border rounded-xl p-5 px-8 bg-secondary">{children}</div>;
};

MetricCard.Label = function MetricCardLabel({ label }: MetricCardLabelProps) {
  return (
    <div className="flex items-center">
      <p className="font-semibold me-auto text-primary">{label}</p>
      <Parentheses size={20} />
    </div>
  );
};

MetricCard.Value = function MetricCardValue({ value }: MetricCardValueProps) {
  return <h4 className="font-bold text-2xl mt-1">{value}</h4>;
};

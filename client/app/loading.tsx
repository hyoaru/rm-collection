import React from "react";
import { CircleDashed } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full h-[80svh] flex justify-center items-center">
      <div className="text-center">
        <span className="block text-xs uppercase mb-10">loading</span>
        <CircleDashed size={50} className="bg-primary rounded-full text-primary mx-auto animate-ping" />
      </div>
    </div>
  );
}

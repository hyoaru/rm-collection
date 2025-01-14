"use client";

import React from "react";
import { useToJpeg } from "@hugocxl/react-to-image";
import dayjs from "dayjs";

// App imports
import { DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/ui/tooltip";
import { ScrollArea } from "@components/ui/scroll-area";
import { Button } from "@components/ui/button";
import ReadOnlyFormControl from "@components/shared/ReadOnlyFormControl";
import { useToast } from "@components/ui/use-toast";
import { Tables } from "@constants/base/database-types";
import { OrderType } from "@constants/shared/types";

type OrderReceiptDialogContentProps = {
  children: React.ReactNode;
  orderGroup: string;
};

type OrderReceiptDialogContentBodyHeaderProps = {
  children: React.ReactNode;
};

type OrderReceiptDialogContentBodyProps = {
  children: React.ReactNode;
  user: Tables<"users"> | null | undefined;
  ordersShipping: Tables<"orders_shipping">;
};

type OrderReceiptDialogContentBodyFooterProps = {
  subtotal: number;
  totalCost: number;
  deliveryFee: number | string;
};

export const OrderReceiptDialogContent = ({ children, orderGroup }: OrderReceiptDialogContentProps) => {
  const { toast } = useToast();

  const [{ isLoading }, downloadReceipt] = useToJpeg({
    selector: "#receiptBody",
    cacheBust: true,
    backgroundColor: "#ffffff",
    onStart: () => {
      (document.querySelector("#receiptBody") as HTMLInputElement).className = "p-5";
      (document.querySelector("#scrollArea") as HTMLInputElement).className = "h-max";
    },
    onSuccess: (data) => {
      const link = document.createElement("a");
      link.download = `rea-mariz-collection_order-receipt_${dayjs().format("YYYY-MM-DD")}.jpeg`;
      link.href = data;
      link.click();
      (document.querySelector("#scrollArea") as HTMLInputElement).className = "h-[250px]";
      (document.querySelector("#receiptBody") as HTMLInputElement).className = "";
      toast({
        title: "Receipt has been downloaded.",
        description: "Please check your downloads.",
      });
    },
  });

  return (
    <DialogContent className={isLoading ? "hidden" : "block"}>
      <div id="receiptBody">
        <DialogHeader>
          <DialogTitle
            className={"text-sm font-normal text-center"}
          >{`Order group #${orderGroup}`}</DialogTitle>
        </DialogHeader>
        {children}
      </div>
      <DialogFooter>
        <div className="w-full mt-2 space-y-4">
          <div className={"flex items-center gap-4"}>
            <Button onClick={downloadReceipt} className={"w-full"}>
              Download receipt
            </Button>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </div>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};

const BodyHeader = ({ children }: OrderReceiptDialogContentBodyHeaderProps) => {
  return (
    <div className="px-5 space-y-1">
      <div className="flex justify-center items-center ">
        <span className="font-bold text-2xl text-center align-middle">{children}</span>
      </div>
      <div className="text-center text-xs opacity-80">Thank you for choosing Rea Mariz Collection Co.Ltd</div>
    </div>
  );
};

const Body = ({ children, user, ordersShipping }: OrderReceiptDialogContentBodyProps) => {
  const orderDetailsReadOnlyFormData = [
    { label: "Customer name", value: `${user?.first_name} ${user?.last_name}` },
    { label: "Receiver email", value: ordersShipping.receiver_email },
    { label: "Receiver name", value: `${ordersShipping.receiver_first_name} ${ordersShipping.receiver_last_name}` },
    { label: "Receiver phone number", value: ordersShipping.receiver_phone_number },
    { label: "Shipping country", value: ordersShipping.shipping_country },
    { label: "Shipping address", value: ordersShipping.shipping_address },
    { label: "Shipping zip code", value: ordersShipping.shipping_zip_code },
    { label: "Order date", value: dayjs(ordersShipping.created_at) },
    { label: "Delivery", value: "Home deliver" },
    { label: "Payment", value: "Bank transfer / E-wallet transfer" },
    { label: "Shipping courier", value: ordersShipping.shipping_courier ?? "Pending" },
    { label: "Shipping tracking id", value: ordersShipping.shipping_tracking_id ?? "Pending" },
    { label: "Shipping fee", value: ordersShipping.shipping_fee ?? "Pending" },
  ];

  return (
    <div className="relative mt-6">
      <div className="absolute z-[2] bottom-0 left-0 right-0">
        <div className="w-full bg-gradient-to-t from-black h-[50px] opacity-30 rounded-br-xl rounded-bl-xl">
          <div className="h-full flex w-full justify-center items-center"></div>
        </div>
      </div>
      <ScrollArea className={"h-[250px] rounded-xl overflow-hidden"} id="scrollArea">
        <div className="space-y-2">
          {orderDetailsReadOnlyFormData.map((orderDetailsFormData) => (
            <ReadOnlyFormControl
              key={`OrderDetailsFormData-${orderDetailsFormData.label}`}
              label={orderDetailsFormData.label}
              value={`${orderDetailsFormData.value}`}
            />
          ))}

          <div className="bg-secondary rounded-xl p-2 px-5">
            <p className="opacity-80 text-xs">{"Instruction"}</p>
            <p className="text-sm">
              <span className="">{"Send a screenshot of this receipt on "}</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href="https://www.facebook.com/ReaMarizCollection"
                      className="font-medium text-info underline"
                      target="_blank"
                      referrerPolicy="no-referrer"
                    >
                      Facebook
                    </a>
                  </TooltipTrigger>

                  <TooltipContent>
                    <p>www.facebook.com/ReaMarizCollection</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <span>{" for the payment channels"}</span>
              <span className="font-medium text-info">{" (Bank transfer / e-wallets) "}</span>
              <span className="">{"to complete your order."}</span>
            </p>
          </div>
        </div>

        <div className="mt-4">
          <div className="rounded-xl p-3 px-5 border">
            <div className="grid grid-cols-12 gap-2">{children}</div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

const BodyFooter = ({ subtotal, totalCost, deliveryFee }: OrderReceiptDialogContentBodyFooterProps) => {
  return (
    <div className="mt-4 rounded-xl border p-3 px-5 text-sm">
      <div className="flex items-center">
        <p className="opacity-80 me-auto">Subtotal</p>
        <p>{`₱ ${subtotal.toLocaleString()}`}</p>
      </div>

      <div className="flex items-center">
        <p className="opacity-80 me-auto">Delivery fee</p>
        <p>{deliveryFee}</p>
      </div>

      <div className="flex items-center font-bold">
        <p className="opacity-80 me-auto">Total</p>
        <p>{`₱ ${totalCost.toLocaleString()}`}</p>
      </div>
    </div>
  );
};

OrderReceiptDialogContent.Body = Body;
OrderReceiptDialogContent.BodyHeader = BodyHeader;
OrderReceiptDialogContent.BodyFooter = BodyFooter;

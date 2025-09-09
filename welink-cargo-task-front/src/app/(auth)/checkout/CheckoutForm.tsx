"use client";
import TicketCheckoutModal from "@/components/TicketCheckoutModal";
import { useCheckout } from "@/services/api";
import { useAppStore } from "@/store/store";
import React, { useState } from "react";

function CheckoutForm() {
  const [ticketId, setTicketId] = useState("");
  const [forceConvertToVisitor, setForceConvertToVisitor] = useState(false);
  const { mutate, data, isPending,isSuccess, isError, error } = useCheckout();
  const config = useAppStore((s) => s.config);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      mutate({ ticketId, forceConvertToVisitor });
    } catch (error) {
      console.log(error);
    }
  };

  function Submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    mutate({ ticketId, forceConvertToVisitor });
  }
  return (
    <>
      <form onSubmit={Submit} className=" max-w-md w-full">
        <div>
          <div>
            <label htmlFor="ticketId" className=" text-sm text-slate-900 dark:text-white font-medium mb-2 block">
              Ticket ID
            </label>
            <input id="ticketId" onChange={(e) => setTicketId(e.target.value)} value={ticketId} name="email" type="text" required className=" bg-slate-100 dark:bg-slate-800  w-full text-sm text-slate-900 dark:text-white px-4 py-3 rounded-md outline-0 border border-gray-200 focus:border-blue-600 focus:bg-transparent" placeholder="Enter Username" />
          </div>
          <div className="mt-4">
            <label htmlFor="forceConvertToVisitor" className=" text-sm text-slate-900 dark:text-white font-medium mb-2 block">
              Customer Type
            </label>
            <select className=" bg-slate-100 dark:bg-slate-800  w-full text-sm text-slate-900 dark:text-white px-4 py-3 rounded-md outline-0 border border-gray-200 focus:border-blue-600 focus:bg-transparent" name="" id="forceConvertToVisitor" onChange={(e) => setForceConvertToVisitor(e.target.value === "true")} value={String(forceConvertToVisitor)}>
              <option value="false">Subscriber</option>
              <option value="true">Visitor</option>
            </select>
          </div>
        </div>

        <button type="submit" className="  mt-8 bg-blue-600 w-full py-2 rounded-md text-white">
          {isPending ? "Loading..." : "Checkout"}
        </button>
      </form>
      <TicketCheckoutModal checkoutTicket={data} />
    </>
  );
}

export default CheckoutForm;

import { ICheckoutResponse } from "@/lib/apiModels";
import React, { useState } from "react";

function TicketCheckoutModal({ checkoutTicket }: { checkoutTicket?: ICheckoutResponse }) {
  const [showModal, setShowModal] = useState(true);
  const active = showModal && !!checkoutTicket;
  const activeClasses = active ? " opacity-100! pointer-events-auto!" : "";

  function clearTicket() {
    // This function should ideally notify the parent to clear the ticket
    // For now, it does nothing as state is controlled by parent
    setShowModal(false);
  }

  return (
    <div className={"fixed inset-0 w-screen h-screen flex items-center justify-center z-50 pointer-events-none bg-black/70 opacity-0  " + activeClasses}>
      <div className="bg-green-500/10 border font-semibold border-green-500 text-white p-4 rounded-md relative pt-7">
        <div className="bg-green-500/20 absolute top-0 left-0 w-full h-full -z-10 blur-2xl"></div>

        {/* close icon */}
        <div className="cursor-pointer text-red-500  absolute top-1 right-1" onClick={clearTicket} title="Close modal">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        {/* ticket message */}

        {checkoutTicket && (
          <table>
            <tbody className="[&>tr>td]:px-2">
              <tr>
                <td>Ticket Id: </td>
                <td>{checkoutTicket.ticketId}</td>
              </tr>
              <tr>
                <td>Amount: </td>
                <td>{checkoutTicket.amount}</td>
              </tr>
              <tr>
                <td>
                  Duration <span className="text-xs">(hours)</span>:{" "}
                </td>
                <td>{checkoutTicket.durationHours}</td>
              </tr>
              <tr>
                <td>Checkin At: </td>
                <td>{new Date(checkoutTicket.checkinAt).toLocaleString()}</td>
              </tr>
              <tr>
                <td>Checkout At: </td>
                <td>{new Date(checkoutTicket.checkoutAt).toLocaleString()}</td>
              </tr>
              <tr>
                <td>Amount: </td>
                <td>{checkoutTicket.breakdown.reduce((acc, item) => acc + item.amount, 0)}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default TicketCheckoutModal;

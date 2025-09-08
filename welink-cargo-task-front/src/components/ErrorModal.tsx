"use client";
import { useLastQueryError } from "@/hooks/useLastQueryError";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

function ErrorModal() {
  const { lastError, clearError } = useLastQueryError();

  const activeClasses = lastError ? " opacity-100!  pointer-events-auto!" : "";

  return (
    <div className={"fixed inset-0 w-screen h-screen flex items-center justify-center z-50 pointer-events-none bg-black/70 opacity-0 " + activeClasses}>
      {/* close modal */}

      <div className="bg-red-500/20 border font-semibold border-red-500 text-white p-4 rounded-md relative pt-7">

        <div className="bg-red-500/20 absolute top-0 left-0 w-full h-full -z-10 blur-2xl"></div>

        {/* close icon */}
        <div  className="cursor-pointer text-red-500  absolute top-1 right-1" onClick={clearError} title="Close modal">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        {/* error message */}
        <p>{lastError?.message}</p>
      </div>
    </div>
  );
}

export default ErrorModal;

"use client";
import { useValidateSubscription } from "@/services/api";
import { useAppStore } from "@/store/store";
import React from "react";

function SubscriberValidationModal() {
  const { mutate, isPending, isError, error } = useValidateSubscription();
  const { config, subscription,setConfig } = useAppStore((s) => s);
  const [id, setId] = React.useState("");

  const activeClasses = Boolean(config.userMode === "subscriber") && !subscription ? " opacity-100!  pointer-events-auto!" : "";

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate({ id });
  }

  function close() {
    setConfig({ ...config, userMode: "visitor" });
  }

  return (
    <div className={"fixed transition inset-0 flex items-center justify-center bg-gray-900/90 opacity-0 pointer-events-none z-50  " + activeClasses}>
      <form onSubmit={submit}>
        <div className="flex gap-2 justify-between items-center mb-5">
          <h4 className="text  ">Verify subscription id to continue</h4>
          {/* close modal */}
          <div className="cursor-pointer text-red-500" onClick={close} title="Close modal">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>

        <div className="flex bg-cyan-400/10 border border-cyan-500 rounded-lg overflow-hidden">
          <label htmlFor="subscriptionId" className="p-2 py-1 ">
            Id:
          </label>
          <input
            required
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="flex-1 p-2 py-1 ps-1 focus:outline-none active:bg-transparent bg-transparent "
            type="text"
            name=""
            id="subscriptionId"
            placeholder="Enter Subscription Id"
          />
          <button title="Verify" type="submit" className="bg-cyan-400/50 text-white p-2 py-1 underline">
            Verify
          </button>
        </div>

        <p className="text-red-500 text-center mt-2">{isError && error?.message}</p>

      </form>
    </div>
  );
}

export default SubscriberValidationModal;

import { IGate, IZone } from "@/lib/apiModels";
import { useCheckIn } from "@/services/api";
import { getItem, useAppStore } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function ZoneCard({ data, userMode }: { data: IZone; userMode: "visitor" | "subscriber" }) {
  const { mutate, isPending, isError, error } = useCheckIn();
  const { config, subscription, userData } = useAppStore((state) => state);

  const isVisitor = userMode === "visitor";

  const visitorClasses = "bg-cyan-300/50 dark:bg-cyan-600/10 border-cyan-800 dark:border-cyan-900";
  const subscriberClasses = "bg-yellow-300/50 dark:bg-yellow-600/10 border-yellow-800 dark:border-yellow-600 text-yellow-800 dark:text-yellow-200";
  const userModeClasses = isVisitor ? visitorClasses : subscriberClasses;

  function chooseZone(zone: IZone) {
    mutate({ gateId: getItem<IGate>("gate")?.id || "", zoneId: zone.id, type: config.userMode, subscriptionId: subscription?.id });
  }

  return (
    <div
      className="h-full relative p-3 rounded-md bg-[#3270c81f] dark:bg-[#0f1c2e63] border border-[#1c76de] dark:border-[#0d3868]
    drop-shadow drop-shadow-gray-600/50 dark:drop-shadow-gray-800/50 text-gray-800 dark:text-gray-200 flex flex-col gap-4"
    >
      {/* closed state */}
      {!data.open && (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden  z-20 flex items-center justify-center">
          <div className="absolute z-[21] top-0 left-1/2 -translate-x-1/2 -translate-y-[5%]  ">
            <Image src="/closed.png" alt="closed" width={100} height={100} />
          </div>
          <div className="absolute top-0 left-0 w-full h-full shadow-yellow-50  blur-xl bg-gray-700 z-20"></div>
        </div>
      )}

      {/* not available for subscription */}
      {!isVisitor && data.open && subscription?.categories.includes(data.categoryId) && (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden  z-20 flex gap-2 flex-col items-center justify-center">
          {/* <Image src="/not-available.png" alt="closed" width={150} height={0} className="object-cover" /> */}
          <div className="text-center text-sm text-red-600 font-semibold">
            <p>Not available for your subscription</p>
            <p className="mt-1">
              switch to <span className=" text-cyan-500 underline">visitor</span> mode
            </p>
          </div>
          <div className="absolute top-0 left-0 w-full h-full shadow-yellow-50  blur-xl bg-gray-700 -z-10"></div>
        </div>
      )}

      {/* free slots count badge */}
      {data.open && (
        <div className="absolute top-1.5 right-0 text-sm font-semibold  text-white  overflow-hidden ps-4">
          <div className="bg-green-600 dark:bg-green-800 py-0.5 pe-2  relative ">
            <span className="z-10">{data.free} free!</span>
            <span className="bg-green-600 dark:bg-green-800 absolute -top-2 -left-2 w-4 h-10 rotate-[-30deg] -z-10"></span>
          </div>
        </div>
      )}

      <h5 className="text-lg font-semibold ">{data.name}</h5>

      <div className={"transition text-center text-sm  border flex-1 rounded py-1 px-2 " + userModeClasses}>
        <p className=" ">
          Open spots: <span className="underline font-semibold">{isVisitor ? data.availableForVisitors : data.availableForSubscribers}</span>
        </p>
      </div>

      {/* <div className="   rounded-lg  ">
          <ul className="list-outside">
            <li>normal: {data.rateNormal}</li>
            <li>special: {data.rateSpecial}</li>
          </ul>
        </div> */}
      {!userData && (
        <button onClick={() => chooseZone(data)} className="   py-2 px-2 w-full   bg-blue-300 dark:bg-blue-600 cursor-pointer text-sm font-semibold rounded leading-none  hover:bg-blue-400">
          Go
        </button>
      )}
    </div>
  );
}

export default ZoneCard;

import { IZone } from "@/lib/apiModels";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function ZoneCard({ data }: { data: IZone }) {
  return (
    <div
      className="h-full relative p-3 rounded-md bg-[#3270c81f] dark:bg-[#0f1c2e63] border border-[#1c76de] dark:border-[#0d3868]
    drop-shadow drop-shadow-gray-600/50 dark:drop-shadow-gray-800/50 text-gray-800 dark:text-gray-200"
    >
      {/*  */}
      {!data.open && (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden  z-20 flex items-center justify-center">
          <div className="absolute z-[21] top-0 left-1/2 -translate-x-1/2 -translate-y-[5%]  ">
            <Image src="/closed.png" alt="closed" width={100} height={100} />
          </div>
          <div className="absolute top-0 left-0 w-full h-full shadow-yellow-50  blur-xl bg-gray-700 z-20"></div>
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

      <section className="    gap-2 mt-2">
        <div className="flex ">
          {/* <span className="w-px min-h-full  me-2 bg-gray-300"></span> */}

          <ul className="flex  w-full shadow-lg text-center rounded overflow-hidden">
            <li className="  bg-cyan-300/50 dark:bg-cyan-600/50 text-sm font-semibold   flex-1 leading-none py-1 px-2">
              <p className="mb-1">For visitors</p>
              <span className="underline">{data.availableForVisitors}</span>
            </li>
            <li className="  bg-yellow-300 dark:bg-yellow-600  h-fit text-sm font-semibold flex-1  leading-none py-1 px-2">
              <p className="mb-1">For subscribers</p>
              <span className="underline">{data.availableForSubscribers}</span>
            </li>
          </ul>
        </div>

        {/* <div className="   rounded-lg  ">
          <ul className="list-outside">
            <li>normal: {data.rateNormal}</li>
            <li>special: {data.rateSpecial}</li>
          </ul>
        </div> */}
      </section>

      <button className="mt-6   py-2 px-2 w-full   bg-blue-300 dark:bg-blue-600 cursor-pointer text-sm font-semibold rounded leading-none  hover:bg-blue-400">Go</button>
    </div>
  );
}

export default ZoneCard;

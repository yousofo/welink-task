"use client";
import { useAppStore } from "@/store/store";
import React, { useEffect, useRef } from "react";

function CheckInSuccess() {
  const { checkInSuccess, setCheckInSuccess } = useAppStore((state) => state);
  const videoRef = useRef<HTMLVideoElement>(null);
  const activeClasses =
    Boolean(checkInSuccess) &&
    " text-green-400 blur-xl  opacity-100  pointer-events-auto";

  useEffect(() => {
    if (checkInSuccess) {
      videoRef.current?.play();
      videoRef.current!.playbackRate = 3;
      setTimeout(() => {
        setCheckInSuccess(null);
      }, 5000);
    }
  }, [Boolean(checkInSuccess)]);

  return (
    <div
      className={
        "fixed inset-0 flex items-center justify-center pointer-events-none bg-black opacity-0 z-50 transition duration-300 ease-in-out" +
        activeClasses
      }
    >
      {/* black overlay */}
      {/* <div className="absolute inset-0 bg-black opacity-50 blur"></div> */}
      <video
        ref={videoRef}
        src="/gate-open-animation.mp4"
        muted
        className="w-full h-full object-cover"
      ></video>
    </div>
  );
}

export default CheckInSuccess;

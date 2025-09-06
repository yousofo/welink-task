"use client";
import { useIsFetching } from "@tanstack/react-query";
import React from "react";

function LoadingIndicator() {
  const isFetching = useIsFetching() !== 0;

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black opacity-0 -z-10 ${isFetching && "opacity-50 z-50"} `}>
      <div className={`w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin`}></div>
    </div>
  );
}

export default LoadingIndicator;

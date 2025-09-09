"use client";
import { IErrorResponse } from "@/lib/apiModels";
import { useLogin } from "@/services/api";
import { useAppStore } from "@/store/store";
import Link from "next/link";
import React, { useState } from "react";

interface loginError {
  status: string;
  message: string;
}

function LoginForm() {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isPending, isError, error } = useLogin();
  const config = useAppStore((s) => s.config);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      mutate({ username, password });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleLogin} className=" max-w-md lg:ml-auto w-full">
      <h2 className=" text-slate-900   dark:text-white text-3xl font-semibold mb-8">Sign in</h2>

      <div className=" space-y-5">
        <div>
          <label className=" text-sm text-slate-900 dark:text-white font-medium mb-2 block">Username</label>
          <input onChange={(e) => setEmail(e.target.value)} value={username} name="email" type="text" required className=" bg-slate-100 dark:bg-slate-800  w-full text-sm text-slate-900 dark:text-white px-4 py-3 rounded-md outline-0 border border-gray-200 focus:border-blue-600 focus:bg-transparent" placeholder="Enter Username" />
        </div>
        <div>
          <label className=" text-sm text-slate-900 dark:text-white font-medium mb-2 block">Password</label>
          <input onChange={(e) => setPassword(e.target.value)} value={password} name="password" type="password" required className=" bg-slate-100 dark:bg-slate-800  w-full text-sm text-slate-900 dark:text-white px-4 py-3 rounded-md outline-0 border border-gray-200 focus:border-blue-600 focus:bg-transparent" placeholder="Enter Password" />
        </div>
        {isError && <div className=" text-red-600">{error.message}</div>}
      </div>

      <div className=" !mt-6">
        <button type="submit" className=" w-full shadow-xl py-2.5 px-4 text-[15px] font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer">
          {isPending ? "Logging in..." : "Login"}
        </button>
        {config.currentGate && (
          <Link className="text-center block mt-2" href={"/gates/" + config.currentGate.id}>
            Go back to <span className="font-semibold underline">{config.currentGate.name}</span> Gate
          </Link>
        )}
      </div>
    </form>
  );
}

export default LoginForm;

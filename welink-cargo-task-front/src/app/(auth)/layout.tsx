import ErrorModal from "@/components/ErrorModal";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ErrorModal />
    </>
  );
}

export default Layout;

"use client";

import React from "react";
import { useGlobalContext } from "@/providers/GlobalContext";
import Sidebar from "@/components/layout/Sidebar/Sidebar";

const DashboardLayoutWrapper = ({ children }) => {
  const { isOpen } = useGlobalContext();

  return (
    <>
      {isOpen && <Sidebar />}

      <div className="min-w-0 flex flex-1 flex-col overflow-hidden transition-all duration-200">
        {children}
      </div>
    </>
  );
};

export default DashboardLayoutWrapper;

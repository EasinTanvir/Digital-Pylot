"use client";

import { createContext, useContext, useState } from "react";

const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <GlobalContext.Provider
      value={{
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("useGlobalContext must be used inside a GlobalProvider");
  }

  return context;
};

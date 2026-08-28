"use client";

import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => {
    if (window.innerWidth <= 1024) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth > 1024);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isOpen,
        setIsOpen,
        closeSidebar,
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

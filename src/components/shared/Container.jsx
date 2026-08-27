import React from "react";

const Container = ({ children, className = "" }) => {
  return (
    <div className={`max-w-7xl mx-auto lg:px-10 sm:px-6 px-3 ${className}`}>
      {children}
    </div>
  );
};

export default Container;

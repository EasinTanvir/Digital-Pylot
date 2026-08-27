import React from "react";

const Container = ({ children, className = "" }) => {
  return (
    <div className={`max-w-7xl mx-auto lg:px-10 px-6 ${className}`}>
      {children}
    </div>
  );
};

export default Container;

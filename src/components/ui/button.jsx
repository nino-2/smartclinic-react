import React from "react";

const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`inline-flex items-center justify-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

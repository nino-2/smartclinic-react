import React from "react";

const Badge = ({ children, className = "", variant = "default", ...props }) => {
  let variantClasses = "";

  switch (variant) {
    case "secondary":
      variantClasses = "bg-gray-200 text-gray-800";
      break;
    case "destructive":
      variantClasses = "bg-red-500 text-white";
      break;
    case "outline":
      variantClasses = "border border-gray-300 text-gray-700";
      break;
    default:
      variantClasses = "bg-blue-600 text-white";
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge; // ✅ default export

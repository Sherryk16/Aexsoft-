"use client";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary";
  children: React.ReactNode;
}

export function Button({ variant = "primary", children, className = "", ...props }: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-200 ease-in-out px-6 py-3 rounded";

  let variantStyles = "";
  switch (variant) {
    case "primary":
      variantStyles = "bg-blue-500 text-white hover:bg-blue-700";
      break;
    case "secondary":
      variantStyles = "bg-transparent border border-blue-900 text-blue-900 hover:bg-blue-50";
      break;
    case "tertiary":
      variantStyles = "bg-transparent text-blue-500 hover:bg-gray-100";
      break;
  }

  return (
    <button className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </button>
  );
}

"use client";

import { Button } from "@mui/material";
import React from "react";

export default function StyledButton({
  children,
  variant,
  handleOnClick,
  disabled,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | undefined;
  handleOnClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}) {
  return (
    <Button
      onClick={handleOnClick}
      className={`flex justify-center items-center text-white px-3 py-2 rounded-3xl disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray ${
        variant === "secondary"
          ? "bg-gray hover:bg-slate-400"
          : "bg-primary hover:bg-red-700"
      }`}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}

"use client";

import { Button } from "@mui/material";
import React from "react";

export default function StyledButton({
  children,
  handleOnClick,
}: {
  children: React.ReactNode;
  handleOnClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <Button
      onClick={handleOnClick}
      className="flex justify-center items-center bg-primary text-white px-3 py-2 rounded-3xl hover:bg-red-700"
    >
      {children}
    </Button>
  );
}

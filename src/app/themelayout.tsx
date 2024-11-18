"use client";

import theme from "@/theme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import React from "react";

export default function ThemeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Resets default MUI styles */}
      {children}
    </ThemeProvider>
  );
}

"use client";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import './globals.css'
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={baselightTheme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
          <SessionProvider>
            {children}
          </SessionProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </body>
    </html>
  );
}

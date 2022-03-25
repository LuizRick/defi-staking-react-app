import React, { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { useAppThemeContext } from "../../context/AppThemeContext";

interface ThemeAppProviderProps {
  children: ReactNode;
  attribute: string | undefined;
}

export default function ThemeAppProvider({
  children,
  attribute,
}: ThemeAppProviderProps) {
  const appContext = useAppThemeContext();
  return (
    <>
      <ThemeProvider attribute={attribute}>
        <MuiThemeProvider theme={appContext.theme}>{children}</MuiThemeProvider>
      </ThemeProvider>
    </>
  );
}

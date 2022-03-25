import * as React from "react";
import { createTheme, Theme } from "@mui/material/styles";

interface AppThemeContext {
  colorMode: {
    toggleColorMode: () => void;
  };
  theme: Partial<Theme> | ((outerTheme: Theme) => Theme);
  mode?: "light" | "dark";
}

const AppThemeContextMode = React.createContext<AppThemeContext>({
  colorMode: {
    toggleColorMode: () => {},
  },
  theme: createTheme(),
});

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = React.useState<"light" | "dark">("dark");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          return prevMode === "light" ? "dark" : "light";
        });
      },
    }),
    []
  );

  const themeMui = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  let sharedState: AppThemeContext = {
    colorMode,
    theme: themeMui,
    mode,
  };

  return (
    <AppThemeContextMode.Provider value={sharedState}>
      {children}
    </AppThemeContextMode.Provider>
  );
}

export function useAppThemeContext() {
  return React.useContext(AppThemeContextMode);
}

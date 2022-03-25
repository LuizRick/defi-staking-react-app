
import React from "react";
import { useTheme } from "next-themes";
import * as Icons from '@mui/icons-material';
import { useAppThemeContext } from "../../context/AppThemeContext";

export default function ThemeToggle() {
  const appContext = useAppThemeContext();
  const [mounted, setMounted] = React.useState(false);
  const { setTheme } = useTheme();
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  function isDark() {
    return appContext.mode === "dark";
  }

  return (
    <button
      className="focus:outline-none"
      onClick={() => {
        appContext.colorMode.toggleColorMode();
        setTheme(isDark() ? "light" : "dark");
      }}
    >
      {isDark() ?  <Icons.DarkMode /> :  <Icons.LightMode />}
    </button>
  );
}

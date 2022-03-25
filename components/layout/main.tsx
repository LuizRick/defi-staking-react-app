import { ReactNode } from "react";
import ThemeAppProvider from "../theme-settings/ThemeAppProvider";
import MenuAppBar from "./menuappbar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <ThemeAppProvider attribute="class">
      <div className="layout-wrapper">
        <MenuAppBar />
        <main>
          <div>{children}</div>
        </main>
      </div>
    </ThemeAppProvider>
  );
}

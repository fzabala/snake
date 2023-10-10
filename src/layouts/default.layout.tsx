import React from "react";
import { Header } from "../components";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return <div className="Layout">
    <Header />
    <main>
      {children}
    </main>
  </div>;
};

import React from "react";
import './Default.layout.scss';
import { Header } from "../components";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return <main className="DefaultLayout">
          <Header />
    {children}
    </main>;
};

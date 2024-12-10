"use client";
import ReduxProvider from "@/providers/ReduxProvider";
import { SessionProvider } from "@/providers/SessionProvider";
import React, { FC, ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

interface RootLayoutClientProps {
  children: ReactNode;
}
const RootLayoutClient: FC<RootLayoutClientProps> = ({ children }) => {
  return (
    <>
      <BrowserRouter>
        <ReduxProvider>
          <SessionProvider>{children}</SessionProvider>
        </ReduxProvider>
      </BrowserRouter>
    </>
  );
};

export default RootLayoutClient;

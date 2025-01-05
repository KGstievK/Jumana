"use client";
import { FC, ReactNode, useEffect } from "react";
import { SessionProvider as NextAuthProvider } from "next-auth/react";
import { Session } from "next-auth";

interface SessionProviderProps {
  children: ReactNode;
  session: Session | null;
}

export const SessionProvider: FC<SessionProviderProps> = ({
  children,
  session,
}) => {
  return <NextAuthProvider session={session}>{children}</NextAuthProvider>;
};

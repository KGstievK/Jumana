"use client";
import { FC, ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  SessionProvider as NextAuthProvider,
  useSession,
} from "next-auth/react";
import { Session } from "react-router-dom";

interface ProtectProviderProps {
  children: ReactNode;
}

const ProtectProvider: FC<ProtectProviderProps> = ({ children }) => {
  const { status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = () => {
    switch (pathname) {
      case "/auth/sign-in":
      case "/auth/sign-up":
      case "/auth/reset-password":
      case "/auth/forgot":
        if (status === "authenticated") {
          router.push("/");
        }
        break;
      case "/admin":
      case "/profile":
      case "/profile/favorite":
      case "/profile/history":
      case "/cart":
        if (status === "unauthenticated") {
          router.push("/auth/sign-in");
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    handleNavigation();
  }, [status, pathname, router]);

  return <>{children}</>;
};

export default ProtectProvider;

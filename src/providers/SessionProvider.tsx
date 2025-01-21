"use client";
import { FC, ReactNode, useEffect } from "react";
// import { SessionProvider as NextAuthProvider } from "next-auth/react";
import { useGetMeQuery } from "@/redux/api/auth";
import { usePathname, useRouter } from "next/navigation";

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider: FC<SessionProviderProps> = ({ children }) => {
  const { status, data } = useGetMeQuery();

  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = () => {
    switch (pathname) {
      case "/auth/sign-in":
      case "/auth/sign-up":
      case "/auth/reset-password":
      case "/auth/forgot":
        if (status === "fulfilled") {
          router.push("/");
        }
        break;
      case "/admin":
      case "/profile":
      case "/profile/favorite":
      case "/profile/history":
      case "/cart":
        if (status === "rejected") {
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

  return children; // <NextAuthProvider>{children}</NextAuthProvider>;
};

"use client";
import { FC, ReactNode, useEffect } from "react";
// import { SessionProvider as NextAuthProvider } from "next-auth/react";
import { useGetMeQuery, usePatchRefreshTokenMutation } from "@/redux/api/auth";
import { usePathname, useRouter } from "next/navigation";

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider: FC<SessionProviderProps> = ({
  children,
}) => {

const { status, data } = useGetMeQuery()
const [refreshTokenMutation] = usePatchRefreshTokenMutation()
  console.log("🚀 ~ data:", data)
  console.log("🚀 ~ status:", status)

  const pathname = usePathname()
  const router = useRouter()

  const handleRefreshToken = async () => {
    const localStorageData = JSON.parse(localStorage.getItem('accessToken')!);
    const { accessTokenExpiration, refresh } = localStorageData;
  
    if (accessTokenExpiration < new Date().getTime()) {
     const { data, error } = await refreshTokenMutation({ refresh });
     console.log(data);
     console.log(error);
    } else {
     console.log('Токен живой!');
    }
   };

  const handleNavigation = () => {
    switch (pathname) {
      case "/auth/sign-in":
      case "/auth/sign-up":
      case "/auth/reset-password":
      case "/auth/forgot":
        if (data) {
          router.push("/");
        }
        break;
      case "/admin":
      case "/profile":
      case "/profile/favorite":
      case "/profile/history":
      case "/cart":
        if (!data) {
          router.push("/auth/sign-in");
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    handleNavigation()
  }, [status, pathname, router])

  return  children // <NextAuthProvider>{children}</NextAuthProvider>;
};

"use client";
import { FC, ReactNode, useEffect } from "react";
import { useGetMeQuery, usePatchRefreshTokenMutation } from "@/redux/api/auth";
import { usePathname, useRouter } from "next/navigation";

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider: FC<SessionProviderProps> = ({ children }) => {
  const { status } = useGetMeQuery();
  const [refreshTokenMutation] = usePatchRefreshTokenMutation();

  const pathname = usePathname();
  const router = useRouter();

  const handleRefreshToken = async () => {
    const localStorageData = JSON.parse(localStorage.getItem("accessToken")!);
    const SessionStorageData = JSON.parse(sessionStorage.getItem("accessToken")!);

    if (!localStorageData || !SessionStorageData) {
      console.warn("Токены отсутствуют в локальном хранилище.");
      return;
    }

    const { access, refresh } = localStorageData || SessionStorageData;
   
    const isTokenExpired = (token: string): boolean => {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const now = Math.floor(Date.now() / 1000);
        return payload.exp < now;
      } catch (error) {
        console.error("Ошибка при проверке токена:", error);
        return true;
      }
    };

    if (isTokenExpired(access)) {
      try {
        const { data } = await refreshTokenMutation({ refresh });
        if (data) {
          localStorage.setItem("accessToken", JSON.stringify(data));
          sessionStorage.setItem("accessToken", JSON.stringify(data));
        }
      } catch (error) {
        console.error("Не удалось обновить токены:", error);
        localStorage.removeItem("accessToken");
        sessionStorage.removeItem("accessToken");
        router.push("/auth/sign-in"); 
      }
    }
  };

  const handleNavigation = () => {
    switch (pathname) {
      case "/auth/sign-in":
      case "/auth/sign-up":
      case "/auth/reset-password":
      case "/auth/forgot":
        if (status === "fulfilled") {
          router.back();
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
    handleRefreshToken();
  }, [pathname]);

  useEffect(() => {
    handleNavigation();
  }, [status, pathname, router]);

  return children;
};

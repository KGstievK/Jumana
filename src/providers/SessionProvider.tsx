"use client";
import { FC, ReactNode, useEffect } from "react";
// import { SessionProvider as NextAuthProvider } from "next-auth/react";
import { useGetMeQuery, usePatchRefreshTokenMutation } from "@/redux/api/auth";
import { usePathname, useRouter } from "next/navigation";

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider: FC<SessionProviderProps> = ({ children }) => {

  const [refreshTokenMutation] = usePatchRefreshTokenMutation();

  const pathname = usePathname();
  const router = useRouter();

  const handleRefreshToken = async () => {
		const localStorageData = JSON.parse(localStorage.getItem('accessToken')!);
		if (localStorageData === 'undefined' || localStorageData === undefined) {
			localStorage.removeItem('accessToken');
		}
		if (localStorageData) {
			const { accessTokenExpiration, refresh } = localStorageData;
			if (accessTokenExpiration < new Date().getTime()) {
				localStorage.removeItem('tokens');
				const { data } = await refreshTokenMutation({ refresh });
				localStorage.setItem('tokens', JSON.stringify(data));
				window.location.reload();
			} else {
				console.log('refreshToken живой!');
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
    handleRefreshToken();
  }, []);

  useEffect(() => {
    handleNavigation();
  }, [status, pathname, router]);

  return children; // <NextAuthProvider>{children}</NextAuthProvider>;
};

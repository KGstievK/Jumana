import { usePathname, useRouter } from "next/navigation";
import scss from "./HeaderProfile.module.scss";
import Link from "next/link";
import Image from "next/image";
import vector from "@/assets/icons/ProfileVector.svg";
import vectorWite from "@/assets/icons/vectorWite.svg";
import { signOut } from "next-auth/react";
import { usePostLogoutMutation } from "@/redux/api/auth";
import { useForm } from "react-hook-form";
import { FC, useState } from "react";


const HeaderProfile: FC = () => {
  const pathname = usePathname();
  console.log(pathname);
  const [postLogout] = usePostLogoutMutation();
  const { handleSubmit } = useForm();
  const router = useRouter();
  const onSubmit = async () => {
    try {
      await postLogout() 
      router.push("/login"); // Перенаправляем на страницу входа
    } catch (err) {
      console.error("Ошибка при выходе:", err);
    }
  };

  const tabs = [
    { label: "Профиль", path: "/profile" },
    { label: "Мои покупки", path: "/profile/history" },
    { label: "Избранные", path: "/profile/favorite" },
    { label: "Выйти", path: "" },
  ];
  const tabsMobile = [
    { label: "Личный Кабинет", path: "/profile/my_office" },
    { label: "Мои покупки", path: "/profile/history" },
    { label: "Избранные", path: "/profile/favorite" },
    { label: "Выйти", path: "/profile/logout" },
  ];


  return (
    <header className={scss.HeaderProfile} >
      <div className={scss.content}>
        <div className={scss.nav}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ul>
              {tabs.map((tab, idx) => (
                <li key={idx}>
                  <Link href={tab.path}>
                    <button
                      onClick={() => {
                        tab.label === "Выйти" ? signOut() : "";
                      }}
                      className={pathname === tab.path ? scss.active : ""}
                      type="submit"
                    >
                      {tab.label}
                      <Image
                        src={pathname === tab.path ? vectorWite : vector}
                        alt="vector"
                      />
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
            <ul>
              {tabsMobile.map((tab, idx) => (
                <li key={idx}>
                  <Link href={tab.path}>
                    <button
                      onClick={() => {
                        tab.label === "Выйти" ? signOut() : "";
                      }}
                      className={pathname === tab.path ? scss.active : ""}
                      type="submit"
                    >
                      {tab.label}
                      <Image
                        src={pathname === tab.path ? vectorWite : vector}
                        alt="vector"
                      />
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          </form>
        </div>
      </div>
    </header>
  );
};

export default HeaderProfile;

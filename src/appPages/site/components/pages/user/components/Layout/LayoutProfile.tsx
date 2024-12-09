import { usePathname } from "next/navigation";
import Header from "./Header/HeaderProfile";
import scss from "./LayoutProfile.module.scss";
import { FC, ReactNode } from "react";
import Link from "next/link";
import { lampa } from "@/appPages/admin/components/pages/icons";

interface LayoutProfileProps {
  children: ReactNode;
}


const LayoutProfile: FC<LayoutProfileProps> = ({ children }) => {
  const pathname = usePathname();
  const tabs = [
    { label: "Личный Кабинет", path: "/profile" },
    { label: "Мои покупки", path: "/profile/history" },
    { label: "Избранные", path: "/profile/favorite" },
    { label: "Выйти", path: "/profile/logout" },
  ];
  return (
    <div className={scss.LayoutProfile}>
      <div className="container">
          <p>
            <Link href='/'>Главная</Link><span>/</span>Профиль <span>/</span>{tabs.map((iten) => (pathname === iten.path ? iten.label : ''))}
          </p>
        <div className={scss.content}>
          <Header />
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default LayoutProfile;

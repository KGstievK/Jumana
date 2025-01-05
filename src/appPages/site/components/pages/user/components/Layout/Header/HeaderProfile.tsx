import { usePathname } from "next/navigation";
import scss from "./HeaderProfile.module.scss";
import Link from "next/link";
import Image from "next/image";
import vector from '@/assets/icons/ProfileVector.svg'
import vectorWite from '@/assets/icons/vectorWite.svg'
import { signOut } from "next-auth/react";
const HeaderProfile = () => {
  const pathname = usePathname();
  console.log(pathname);

  const tabs = [
    { label: "Профиль", path: "/profile" },
    { label: "Мои покупки", path: "/profile/history" },
    { label: "Избранные", path: "/profile/favorite" },
    { label: "Выйти", path: '' },
  ];

  return (
    <header className={scss.HeaderProfile}>
        <div className={scss.content}>
          <div className={scss.nav}>
            <ul>
              {tabs.map((tab, idx) => (
                <li key={idx}>
                  <Link href={tab.path}>
                    <button onClick={() => {tab.label === 'Выйти' ? signOut() : ''}}
                      className={pathname === tab.path ? scss.active : ""}
                    >
                      {tab.label}
                    <Image src={ pathname === tab.path ? vectorWite : vector} alt="vector" />
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
    </header>
  );
};

export default HeaderProfile;

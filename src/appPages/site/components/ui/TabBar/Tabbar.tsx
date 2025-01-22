import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoHome, GoHomeFill } from "react-icons/go";
import {
  HiOutlineViewGrid,
  HiOutlineShoppingCart,
  HiOutlineUser,
} from "react-icons/hi";
import { HiViewGrid, HiShoppingCart, HiUser } from "react-icons/hi";
import s from "./TabBAr.module.scss";

const Tabbar = () => {
  const pathname = usePathname();

  const tabs = [
    {
      name: "Главная",
      icon: <GoHome />,
      activeIcon: <GoHomeFill />,
      link: "/",
    },
    {
      name: "Категории",
      icon: <HiOutlineViewGrid />,
      activeIcon: <HiViewGrid />,
      link: "/catalog",
    },
    {
      name: "Корзина",
      icon: <HiOutlineShoppingCart />,
      activeIcon: <HiShoppingCart />,
      link: "/cart",
    },
    {
      name: "Профиль",
      icon: <HiOutlineUser />,
      activeIcon: <HiUser />,
      link: "/profile",
    },
  ];

  return (
    <div className={s.TabBar}>
      <div className="container">
        <div className={s.content}>
          {tabs.map((tab) => (
            <div className={s.block} key={tab.name}>
              <Link href={tab.link}>
                {pathname === tab.link ? (
                  <span className={s.active}>{tab.activeIcon}</span>
                ) : (
                  <span>{tab.icon}</span>
                )}
                <h4
                  style={{
                    color: pathname === tab.link ? "#A40011" : "#616161",
                  }}
                >
                  {tab.name}
                </h4>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tabbar;

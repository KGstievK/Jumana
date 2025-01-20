'use client'
import { usePathname } from "next/navigation";
import scss from "./History.module.scss";
import Link from "next/link";

const History = () => {
  const pathname = usePathname();
      const tabs = [
        { label: "Профиль", path: "/profile" },
        { label: "Мои покупки", path: "/profile/history" },
        { label: "Избранные", path: "/profile/favorite" },
        { label: "Выйти", path: "/profile/logout" },
      ];
  return (
    <section className={scss.History}>
       {/* <p>
          <Link href="/">Главная</Link>
          <span>/</span> <Link href="/profile">Профиль</Link><span>/</span>
          {tabs.map((iten) => (pathname === iten.path ? iten.label : ""))}
        </p> */}
      <div className="container">
        <div className={scss.content}>
          <h1>История заказов</h1>
          <p>Отслеживание, возврат или покупка товаров</p>
          
        </div>
      </div>
    </section>
  );
};

export default History;

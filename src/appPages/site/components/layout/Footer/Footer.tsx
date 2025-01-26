import Link from "next/link";
import scss from "./Footer.module.scss";
import Image from "next/image";
import logo from "@/assets/icons/logoWite.svg";
import { useGetContactInfoQuery } from "@/redux/api/category";

const Footer = () => {
  const { data } = useGetContactInfoQuery();

  const links = [
    {
      link: "/",
      name: "Главная",
    },
    {
      link: "/new",
      name: "Новинки",
    },
    {
      link: "/catalog",
      name: "Категории",
    },
    {
      link: "/about",
      name: "О нас",
    },
    {
      link: "/contacts",
      name: "Контакты",
    },
  ];
  const help = [
    {
      name: "Доставка",
    },
    {
      name: "Оплата",
    },
    {
      name: "Частые вопросы",
    },
    {
      name: "Политика конфиденциальности",
    },
  ];

  return (
    <footer className={scss.Footer}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.footerLogo}>
            <Link href="/">
              <Image src={logo} alt="Logo" />
            </Link>
          </div>
          <div className={scss.footerResurse}>
            {data?.map((item, idx) => (

              <div key={idx} className={scss.footerContacts}>
                <ul className={scss.footerUl}>
                  <li className={scss.footerLi}>
                    <span>WhatsApp</span>
                    <Link href="">: {item.messenger}</Link>
                  </li>
                  <li className={scss.footerLi}>
                    <span>Email</span> <Link href="">:{item.email}</Link>
                  </li>
                  <li className={scss.footerLi}>
                    <span>Address</span>
                    <Link href="">{item.address}</Link>
                  </li>
                </ul>
              </div>
            ))}

            <div className={scss.navigation}>
              <div className={scss.footerNav}>
                <h1>Меню</h1>
                <ul>
                  {links.map((item, idx) => (
                    <li key={idx}>
                      <Link href={item.link}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={scss.footerHelp}>
                <h1>Обратиться за помощью</h1>
                {help.map((item, idx) => (
                  <li key={idx}>
                    <Link href="">{item.name}</Link>
                  </li>
                ))}
              </div>
            </div>
          </div>
          <div className={scss.Corporation}>
            <p>All rights reserved</p>
            <p>Copyright 2024 By Jumana Fashion</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

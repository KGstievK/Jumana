import Link from "next/link";
import scss from "./Footer.module.scss";

const Footer = () => {
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
      // link: "/",
      name: "Доставка",
    },
    {
      // link: "/new",
      name: "Оплата",
    },
    {
      // link: "/catalog",
      name: "Частые вопросы",
    },
    {
      // link: "/about",
      name: "Политика конфиденциальности",
    },
  
  ];

  return (
    <footer className={scss.Footer}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.footerResurse}>
            <div className={scss.footerContacts}>
              <ul className={scss.footerUl}>
                <li className={scss.footerLi}>
                  <span>WhatsApp</span> <Link href="">: +996700987654</Link>
                </li>
                <li className={scss.footerLi}>
                  <span>Email</span> <Link href="">: hello@modestwear.com</Link>
                </li>
                <li className={scss.footerLi}>
                  <span>Address</span>{" "}
                  <Link href="">
                    : Lorem ipsum street Block B Number 08, Bishkek, Kyrgyzstan,
                    12345
                  </Link>
                </li>
              </ul>
            </div>
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
                    <Link href=''>{item.name}</Link>
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

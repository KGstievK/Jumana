import { usePathname } from "next/navigation";
import scss from "./Header.module.scss";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/icons/logo.svg";
import profile from "@/assets/icons/Profile.svg";
import cart from "@/assets/icons/cart.svg";
import Search from "@/appPages/site/components/ui/Search/Search";


const Header = () => {
  const pathname = usePathname();

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
  return (
    <header className={scss.Header}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.Logo}>
            <a href="/">
              <Image src={logo} alt="Logo" />
            </a>
          </div>
          <div className={scss.Search}>
            <Search/>
          </div>
          <div className={scss.nav}>
            <ul>
              {links.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.link}
                    className={pathname === item.link ? scss.active : ""}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={scss.profile_cart}>
            <div>
              <Search/>
            </div>
            <Link href="/profile">
              <Image src={profile} alt="Profile" />
            </Link>
            <Link href="/cart">
              <Image src={cart} alt="cart" />
            </Link>
          </div>
          <div className={scss.burgerMenu}>
            
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

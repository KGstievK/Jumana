import { usePathname } from "next/navigation";
import scss from "./HeaderAdmin.module.scss";
import Link from "next/link";

const HeaderAdmin = () => {
  const pathname = usePathname();

  return (
    <section className={scss.HeaderAdmin}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.nav}>
            <ul>
              <li>
                <Link href="/admin/addproduct">
                  <button
                    className={
                      pathname === "/admin/addproduct" ? scss.active : ""
                    }
                  >
                    Add Product
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/admin/addcategory">
                  <button
                    className={
                      pathname === "/admin/addcategory" ? scss.active : ""
                    }
                  >
                    Add Category
                  </button>
                </Link>
              </li> 
              <li>
                <Link href="/admin/addslider">
                  <button
                    className={
                      pathname === "/admin/addslider" ? scss.active : ""
                    }
                  >
                    Add Slider
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/admin/order">
                  <button
                    className={pathname === "/admin/order" ? scss.active : ""}
                  >
                    Order
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderAdmin;

import scss from "./HeaderAdmin.module.scss";

const HeaderAdmin = () => {
  return (
    <section className={scss.HeaderAdmin}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.nav}>
            <ul>
              <li>
                <a href="/admin/addproduct">
                  <button>Add Product</button>
                </a>
              </li>
              <li>
                <a href="/admin/addcategory">
                  <button>Add Category</button>
                </a>
              </li>
              <li>
                <a href="/admin/addslider">
                  <button>Add Slider</button>
                </a>
              </li>
              <li>
                <a href="/admin/order">
                  <button>Order</button>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderAdmin;

import Image from "next/image";
import scss from "./CatrSection.module.scss";
import img1 from "@/assets/image.png";
//! Это Корзина

const CatrSection = () => {
  return (
    <section className={scss.CatrSection}>
      <div className="container">
        <div className={scss.content}>
          <h1>Корзина</h1>
          <div className={scss.block_left}>
            <div className={scss.title}>
              <p>Продукт</p>
             <div className={scss.title_cur}>
             <p>Цена</p>
              <p>Количество</p>
              <p>Всего</p>
             </div>
            </div>
            <div className={scss.box}>
              <Image src={img1} alt="" />
              <div className={scss.text}>
                <h3>Jumana-21</h3>
              </div>
              <div className={scss.price_text}>
                <h2>1200c</h2>
              <div className={scss.cur}>
                <button>-</button>
                <p>2</p>
                <button>+</button>
              </div>
                <h2>1200c</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CatrSection;

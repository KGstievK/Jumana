import Image from "next/image";
import scss from "./CatrSection.module.scss";
import img1 from "@/assets/image.png";
import { table } from "console";
//! Это Корзина

const CatrSection = () => {
  return (
    <section className={scss.CatrSection}>
      <div className="container">
        <div className={scss.content}>
          <h1>Корзина</h1>
          <div className={scss.block}>
            <div className={scss.block_left}>
            
              <div className={scss.title}>
                <p>Продукт</p>
                <div className={scss.title_cur}>
                  <p>Цена</p>
                  <p>Количество</p>
                  <p>Всего</p>
                </div>
              </div>
              <div className={scss.table}>
                <div className={scss.box}>
                  <Image src={img1} alt="" />
                  <div className={scss.text}>
                    <h3>JUMANA-21</h3>
                    <p>Черный</p>
                  </div>
                  <div className={scss.price_text}>
                    <h2>1400c</h2>
                    <div className={scss.cur}>
                      <div className={scss.plus_minus}>
                        <button className="decrement">-</button>
                        <h4>2</h4>
                        <button className="increment">+</button>
                      </div>
                      <p>удалить</p>
                    </div>
                    <h2>1200c</h2>
                  </div>
                </div>
                <hr />{" "}
                <div className={scss.box}>
                  <Image src={img1} alt="" />
                  <div className={scss.text}>
                    <h3>JUMANA-21</h3>
                    <p>Черный</p>
                  </div>
                  <div className={scss.price_text}>
                    <h2>1400c</h2>
                    <div className={scss.cur}>
                      <div className={scss.plus_minus}>
                        <button className="decrement">-</button>
                        <h4>2</h4>
                        <button className="increment">+</button>
                      </div>
                      <p>удалить</p>
                    </div>
                    <h2>1200c</h2>
                  </div>
                </div>
                <hr />
                <div className={scss.box}>
                  <Image src={img1} alt="" />
                  <div className={scss.text}>
                    <h3>JUMANA-21</h3>
                    <p>Черный</p>
                  </div>
                  <div className={scss.price_text}>
                    <h2>1400c</h2>
                    <div className={scss.cur}>
                      <div className={scss.plus_minus}>
                        <button className="decrement">-</button>
                        <h4>2</h4>
                        <button className="increment">+</button>
                      </div>
                      <p>удалить</p>
                    </div>
                    <h2>1200c</h2>
                  </div>
                </div>
                <hr />
              </div>
            </div>
            <div className={scss.block_right}>
              <h2>Детали оплаты</h2>
              <div className={scss.box}>
                <Image src={img1} alt="" />
                <div className={scss.text}>
                  <h3>JUMANA-21</h3>
                  <p>Черный</p>
                  <p className={scss.quantity}>2 x 1400</p>
                </div>
              </div>{" "}
              <div className={scss.box}>
                <Image src={img1} alt="" />
                <div className={scss.text}>
                  <h3>JUMANA-21</h3>
                  <p>Черный</p>
                </div>
              </div>
              <div className={scss.summary}>
                <div className={scss.row}>
                  <span>Итог</span>
                  <span>4800с</span>
                </div>
                <div className={scss.row}>
                  <span>Доставка</span>
                  <span>Бесплатно</span>
                </div>
                <div className={scss.row}>
                  <span>Скидка</span>
                  <span>-600с</span>
                </div>
                <div className={scss.total_row}>
                  <span>Итого к оплате:</span>
                  <span>4400с</span>
                </div>
              </div>
              <div className={scss.information}></div>
              <button>Оформить заказ</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CatrSection;

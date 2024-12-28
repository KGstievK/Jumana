"use client";
import Image from "next/image";
import scss from "./CatrSection.module.scss";
import img1 from "@/assets/image.png";
import { useRouter } from "next/navigation";
import logoBasket from "@/assets/images/basket.svg";
import { useGetBasketQuery } from "@/redux/api/product";
//! Это Корзина

const CatrSection = () => {
  const { data } = useGetBasketQuery();
  console.log("🚀 ~ CatrSection ~ data:", data);
  const router = useRouter();

  const handleRoute = () => {
    router.push("/catalog");
  };
  const goToCheckout = () => {
    // Buton tıklaması ile yönlendirme
    router.push("/cart/checkout");
  };
  return (
    <section className={scss.CatrSection}>
      <div className="container">
        <div className={scss.content}>
          <h1>Корзина</h1>

          {data ? (
            <>
              <div className={scss.block}>
                <div className={scss.block_left}>
                  <div className={scss.table}>
                    <table>
                      <thead>
                        <tr>
                          <th>Продукт</th>
                          <th>Цена</th>
                          <th>Количество</th>
                          <th>Всего</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td>
                            <div className={scss.product}>
                              <Image
                                width={100}
                                height={100}
                                src={img1}
                                alt="product"
                              />
                              <div className={scss.title}>
                                <h3>JUMANA-21</h3>
                                <p>Черный</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <h2>1400c</h2>
                          </td>
                          <td>
                            <div className={scss.plus_minus}>
                              <button>-</button>
                              <h4>2</h4>
                              <button>+</button>
                            </div>
                          </td>
                          <td>
                            <h2>2800c</h2>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className={scss.product}>
                              <Image
                                width={100}
                                height={100}
                                src={img1}
                                alt="product"
                              />
                              <div className={scss.title}>
                                <h3>JUMANA-21</h3>
                                <p>Черный</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <h2>1400c</h2>
                          </td>
                          <td>
                            <div className={scss.plus_minus}>
                              <button>-</button>
                              <h4>2</h4>
                              <button>+</button>
                            </div>
                          </td>
                          <td>
                            <h2>2800c</h2>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className={scss.product}>
                              <Image
                                width={100}
                                height={100}
                                src={img1}
                                alt="product"
                              />
                              <div className={scss.title}>
                                <h3>JUMANA-21</h3>
                                <p>Черный</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <h2>1400c</h2>
                          </td>
                          <td>
                            <div className={scss.plus_minus}>
                              <button>-</button>
                              <h4>2</h4>
                              <button>+</button>
                            </div>
                          </td>
                          <td>
                            <h2>2800c</h2>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className={scss.block_right}>
                  <h2>Детали оплаты</h2>
                  <div className={scss.box}>
                    <Image src={img1} alt="product" />
                    <div className={scss.text}>
                      <h3>JUMANA-21</h3>
                      <p>Черный</p>
                      <p className={scss.quantity}>2 x 1400c</p>
                    </div>
                  </div>
                  <div className={scss.box}>
                    <Image src={img1} alt="product" />
                    <div className={scss.text}>
                      <h3>JUMANA-21</h3>
                      <p>Черный</p>
                      <p className={scss.quantity}>2 x 1400c</p>
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
                  <button onClick={goToCheckout} >Оформить заказ</button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={scss.basket}>
                <Image src={logoBasket} alt="basket" />

                <div className={scss.basketBlock}>
                  <h3>Ваша корзина пуста</h3>
                  <p>
                    Похоже, вы еще не добавили в корзину никаких товаров.
                    Начните делать покупки, чтобы заполнить ее.
                  </p>
                  <button onClick={() => handleRoute()}> Добавить товар</button>
                  <button onClick={goToCheckout} >Оформить заказ</button>

                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CatrSection;

"use client";
import Image from "next/image";
import scss from "./CatrSection.module.scss";
import { useParams, useRouter } from "next/navigation";
import { useGetBasketQuery } from "@/redux/api/product";
import { useState } from "react";

const CatrSection = () => {
  const { data } = useGetBasketQuery();
  const { id } = useParams();
  console.log("🚀 ~ CatrSection ~ id:", id);
  console.log("🚀 ~ CatrSection ~ data:", data);
  const router = useRouter();

  const handleRoute = () => {
    router.push("/catalog");
  };

  const goToCheckout = () => {
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
                        {data?.map((item, index) => {
                          const selectedImage = item.clothes.clothes_img.find(
                            (img) => img.id === item.color
                          );

                          return (
                            <tr key={index}>
                              <td>
                                <div className={scss.product}>
                                  <Image
                                    width={100}
                                    height={100}
                                    src={
                                      selectedImage?.photo ||
                                      "/fallback-image.png"
                                    }
                                    alt="product"
                                  />
                                  <div className={scss.title}>
                                    <h3>{item.clothes.clothes_name}</h3>
                                    <p>{selectedImage?.color}</p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <h2>{item.price_clothes}c</h2>
                              </td>
                              <td>
                                <div className={scss.plus_minus}>
                                  <button>-</button>
                                  <h4>{item.quantity}</h4>
                                  <button>+</button>
                                </div>
                              </td>
                              <td>
                                <h2>{item.total_price}c</h2>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className={scss.block_right}>
                  <h2>Детали оплаты</h2>
                  <div className={scss.box}>
                    {/* Ödeme detaylarını burada ekleyebilirsiniz */}
                  </div>
                  <div className={scss.summary}>
                    <div className={scss.row}>
                      <span>Итог</span>
                      <span>c</span>
                    </div>
                    <div className={scss.row}>
                      <span>Доставка</span>
                      <span>Бесплатно</span>
                    </div>
                    <div className={scss.row}>
                      <span>Скидка</span>
                      <span>-600c</span>
                    </div>
                    <div className={scss.total_row}>
                      <span>Итого к оплате:</span>
                      <span>c</span>
                    </div>
                  </div>
                  <button onClick={goToCheckout}>Оформить заказ</button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={scss.basket}>
                <div className={scss.basketBlock}>
                  <h3>Ваша корзина пуста</h3>
                  <p>
                    Похоже, вы еще не добавили в корзину никаких товаров.
                    Начните делать покупки, чтобы заполнить ее.
                  </p>
                  <button onClick={handleRoute}>Добавить товар</button>
                  <button onClick={goToCheckout}>Оформить заказ</button>
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

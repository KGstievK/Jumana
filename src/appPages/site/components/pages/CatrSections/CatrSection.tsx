"use client";
import Image from "next/image";
import scss from "./CatrSection.module.scss";
import { useParams, useRouter } from "next/navigation";
import {
  useDeleteBasketMutation,
  useGetCartQuery,
  useUpdateBasketMutation,
} from "@/redux/api/product";

import { useState, useEffect } from "react";

const CatrSection = () => {
  const { data: cart ,refetch} = useGetCartQuery();
  console.log("🚀 ~ CatrSection ~ cart:", cart);
  const [basketData, setBasketData] = useState(
    cart && Array.isArray(cart) && cart[0]?.cart_items ? cart[0].cart_items : []
  );

  useEffect(() => {
    if (cart && Array.isArray(cart) && cart[0]?.cart_items) {
      setBasketData(cart[0].cart_items);
    }
  }, [cart]);
  const [updateMutation] = useUpdateBasketMutation();
  const [deleteMutation] = useDeleteBasketMutation();
  const router = useRouter();

  const handleRoute = () => {
    router.push("/catalog");
  };

  const goToCheckout = () => {
    router.push("/cart/checkout");
  };

  const prod = cart && Array.isArray(cart) && cart[0]?.total_price;

  const handleUpdateQuantity = async (itemId: number, quantity: number) => {
    const updateData = { quantity };
    try {
      const updatedItem = basketData.map((item: cart) =>
        item.id === itemId ? { ...item, quantity } : item
      );
      const response = await updateMutation({
        id: itemId,
        updateBasket: updateData,
      });
      setBasketData(updatedItem);
      await refetch();
      console.log("Update Success", response);
    } catch (error) {
      console.error("Error updating basket", error);
    }
  };

  return (
    <section className={scss.CatrSection}>
      <div className="container">
        <div className={scss.content}>
          <h1>Корзина</h1>

          {cart ? (
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
                        {basketData.map((item: cart, index: number) => {
                          const selectedImage = item.clothes.clothes_img.find(
                            (img) => img.id === item.color
                          );

                          return (
                            <tr key={index}>
                              <td>
                                <div className={scss.product}>
                                  <Image
                                    width={130}
                                    height={140}
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
                                <div className={scss.left_box}>
                                  <div className={scss.price}>
                                    <del>{item.price_clothes}c</del>
                                    <h4>{item.just_price}с</h4>
                                  </div>
                                  <div className={scss.center}>
                                    <div className={scss.plus_minus}>
                                      <button
                                        onClick={() =>
                                          handleUpdateQuantity(
                                            item.id,
                                            item.quantity - 1
                                          )
                                        }
                                      >
                                        -
                                      </button>
                                      <h4>{item.quantity} </h4>
                                      <button
                                        onClick={() =>
                                          handleUpdateQuantity(
                                            item.id,
                                            item.quantity + 1
                                          )
                                        }
                                      >
                                        +
                                      </button>
                                    </div>

                                    <p onClick={() => deleteMutation(item.id)}>
                                      удалить
                                    </p>
                                  </div>

                                  <h2>{item.total_price}c</h2>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                {cart ? (
                  <>
                    <div className={scss.block_right}>
                      <h2>Детали оплаты</h2>
                      {basketData.map((item: cart, index: number) => {
                        const selectedImage = item.clothes.clothes_img.find(
                          (img) => img.id === item.color
                        );

                        return (
                          <div key={index} className={scss.box}>
                            <Image
                              width={150}
                              height={150}
                              src={selectedImage?.photo || "photo"}
                              alt="product"
                            />
                            <div className={scss.text}>
                              <h3>{item.clothes.clothes_name}</h3>
                              <p>{selectedImage?.color}</p>
                              <p className={scss.quantity}>
                                {item.quantity} x {item.just_price}c
                              </p>
                            </div>
                          </div>
                        );
                      })}

                      <div className={scss.summary}>
                        <div className={scss.row}>
                          <span>Итог</span>
                          <span>{prod} сом</span>
                        </div>

                        <div className={scss.row}>
                          <span>Скидка</span>
                          <span>0</span>
                        </div>
                        <div className={scss.total_row}>
                          <span>Итого к оплате:</span>
                          <span>{prod} сом</span>
                        </div>
                      </div>
                      <button>Продолжить</button>
                    </div>
                  </>
                ) : (
                  <></>
                )}
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

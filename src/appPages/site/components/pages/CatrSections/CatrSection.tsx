"use client";
import Image from "next/image";
import imgBasket from "@/assets/images/basket.svg";
import scss from "./CatrSection.module.scss";
import { useParams, useRouter } from "next/navigation";
import {
  useDeleteBasketMutation,
  useGetCartQuery,
  useUpdateBasketMutation,
} from "@/redux/api/product";
import { useState, useEffect } from "react";

interface CartItem {
  id: number;
  quantity: number;
  price_clothes: number;
  just_price: number;
  total_price: number;
  color: number;
  clothes: {
    clothes_name: string;
    clothes_img: Array<{
      id: number;
      photo: string;
      color: string;
    }>;
  };
}

const CartSection = () => {
  const { data: cart, refetch, isLoading } = useGetCartQuery();
  const [basketData, setBasketData] = useState<CartItem[]>([]);
  const [updateMutation] = useUpdateBasketMutation();
  const [deleteMutation] = useDeleteBasketMutation();
  const router = useRouter();

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (Array.isArray(cart) && cart[0]?.cart_items && cart.length > 0) {
      setBasketData(cart[0].cart_items);
    }
  }, [cart]);

  const handleRoute = () => router.push("/catalog");

  const goToCheckout = async () => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(basketData));
      router.push("/cart/checkout");
    } catch (error) {
      console.error("Error processing checkout:", error);
    }
  };

  const totalPrice = cart && Array.isArray(cart) && cart[0]?.total_price;

  const handleUpdateQuantity = async (itemId: number, quantity: number) => {
    if (quantity < 1) return;

    try {
      const updatedItem = basketData.map((item: CartItem) =>
        item.id === itemId ? { ...item, quantity } : item
      );
      await updateMutation({
        id: itemId,
        updateBasket: { quantity },
      });
      setBasketData(updatedItem);
      await refetch();
    } catch (error) {
      console.error("Error updating basket", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMutation(id);
      await refetch();
      setBasketData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <section className={scss.CatrSection}>
      <div className="container">
        <div className={scss.content}>
          <h1>Корзина</h1>

          {!isLoading && basketData && basketData.length > 0 ? (
            <div className={scss.block}>
              <div className={scss.block_left}>
                <div className={scss.table}>
                  <table>
                    <thead>
                      <tr>
                        <th>
                          <div className={scss.product}>
                            <p>Продукт</p>
                          </div>
                        </th>
                        <th>
                          <div className={scss.left_box}>
                            <p>Цена</p>
                            <p>Количество</p>
                            <p>Всего</p>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {basketData.map((item: CartItem, index: number) => {
                        const selectedImage = item.clothes.clothes_img.find(
                          (img) => img.id === item.color
                        );

                        return (
                          <tr key={index}>
                            <td>
                              <div className={scss.product}>
                                <Image
                                  width={130}
                                  height={130}
                                  src={
                                    selectedImage?.photo ||
                                    "/fallback-image.png"
                                  }
                                  alt="product"
                                />
                                <div className={scss.title}>
                                  <h4>{item.clothes.clothes_name}</h4>
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
                                    <h4>{item.quantity}</h4>
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
                                  <p
                                    className={scss.delete}
                                    onClick={() => handleDelete(item.id)}
                                  >
                                    удалить
                                  </p>
                                </div>
                                <div className={scss.price2}>
                                  <h4>{item.total_price}c</h4>
                                </div>
                              </div>
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
                {basketData.map((item: CartItem, index: number) => {
                  const selectedImage = item.clothes.clothes_img.find(
                    (img) => img.id === item.color
                  );

                  return (
                    <div key={index} className={scss.box}>
                      <Image
                        width={150}
                        height={150}
                        src={selectedImage?.photo || "/fallback-image.png"}
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
                    <span>{totalPrice} сом</span>
                  </div>
                  <div className={scss.row}>
                    <span>Скидка</span>
                    <span>0</span>
                  </div>
                  <div className={scss.total_row}>
                    <span>Итого к оплате:</span>
                    <span>{totalPrice} сом</span>
                  </div>
                </div>
                <button onClick={goToCheckout}>Продолжить</button>
              </div>
            </div>
          ) : (
            <div className={scss.basket}>
              <div className={scss.basketBlock}>
                <Image src={imgBasket} alt="photo" />
                <h3>Ваша корзина пуста</h3>
                <p>
                  Похоже, вы еще не добавили в корзину никаких товаров. Начните
                  делать покупки, чтобы заполнить ее.
                </p>
                <button onClick={handleRoute}>Добавить товар</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CartSection;

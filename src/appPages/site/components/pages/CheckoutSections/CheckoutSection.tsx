"use client";
import React, { useEffect, useState } from "react";
import scss from "./CheckoutSection.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  useGetCartQuery,
  useGetOrderQuery,
  usePostOrderMutation,
} from "@/redux/api/product";
import { SubmitHandler, useForm } from "react-hook-form";
import { IOrderPost } from "@/types/schema";
import ModalConsul from "./ModalConsul";

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

const CheckoutSection = () => {
  const router = useRouter();
  const { data: cart,} = useGetCartQuery();
  const [basketData, setBasketData] = useState<CartItem[]>([]);
  const [postOrderMutation] = usePostOrderMutation();
  const { register, handleSubmit } = useForm<IOrderPost>();
  const [step, setStep] = useState(1);
  const { data: check } = useGetOrderQuery();
  const [isClosing, setIsClosing] = useState(false);
  const [modalType, setModalType] = useState<"form" | "success" | null>(null);
  useEffect(() => {
    if (cart && Array.isArray(cart) && cart[0]?.cart_items) {
      setBasketData(cart[0].cart_items);
    }
  }, [cart]);

  const totalPrice = cart && Array.isArray(cart) && cart[0]?.total_price;

  const onSubmit: SubmitHandler<IOrderPost> = async (data) => {
    const orderData = {
      order_user: cart?.[0]?.user,
      cart_id: cart?.[0]?.id,
      delivery: data.delivery,
      first_name: data.first_name,
      phone_number: data.phone_number,
      city: data.city,
      address: data.address,
    };

    try {
      await postOrderMutation(orderData);
      // router.push("/success");
    } catch (error) {
      console.error("Order error:", error);
    }
  };

  const handleNextStep = () => setStep((prev) => prev + 1);
  const handlePrevStep = () => setStep((prev) => prev - 1);

  const handleOpenModal = () => {
    setModalType("form");
  };

  const handleCloseModal = (type?: "success" | null) => {
    setIsClosing(true);
    setTimeout(() => {
      setModalType(type || null);
      setIsClosing(false);
    }, 300);
  };

  return (
    <>
      <section className={scss.CheckoutSection}>
        <div className="container">
          <div className={scss.content}>
            <div className={scss.block_left}>
              <form onSubmit={handleSubmit(onSubmit)}>
                {step === 1 && (
                  <div className={scss.step}>
                    <h2>Личная информация</h2>
                    <div className={scss.stepOne}>
                      <label>
                        Имя
                        <input
                          type="text"
                          placeholder="Введите ваше имя"
                          {...register("first_name", {
                            required: true,
                          })}
                        />
                      </label>
                      <label>
                        Телефон
                        <input
                          type="tel"
                          placeholder="Введите ваш телефон"
                          {...register("phone_number", {
                            required: true,
                          })}
                        />
                      </label>
                      <label>
                        Город
                        <input
                          type="text"
                          placeholder="Введите ваш город"
                          {...register("city", { required: true })}
                        />
                      </label>
                      <label>
                        Адрес
                        <input
                          type="text"
                          placeholder="Введите ваш адрес"
                          {...register("address", { required: true })}
                        />
                      </label>
                      <button type="button" onClick={handleNextStep}>
                        Далее
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className={scss.step}>
                    <h2>Способ получения</h2>
                    <div className={scss.deliveryForm}>
                      <label className={scss.radioLabel}>
                        <input
                          type="radio"
                          value="самовывоз"
                          {...register("delivery", { required: true })}
                        />
                        <div className={scss.radioContent}>
                          <p>Самовывоз</p>
                          <p className={scss.deliveryDetail}>
                            1-2 рабочих дней
                          </p>
                        </div>
                      </label>
                      <label className={scss.radioLabel}>
                        <input
                          type="radio"
                          value="курьер"
                          {...register("delivery", { required: true })}
                        />
                        <div className={scss.radioContent}>
                          <p>Доставка</p>
                          <div className={scss.sum}>
                            <p>за час</p>
                            <p>200с</p>
                          </div>
                        </div>
                      </label>
                      <div className={scss.buttonGroup}>
                        <button type="button" onClick={handlePrevStep}>
                          Назад
                        </button>
                        <button onClick={handleOpenModal} type="submit">
                          Оформить заказ
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>

            <div className={scss.block_right}>
              <h2>Детали оплаты</h2>
              {basketData.map((item, index) => {
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
            </div>
          </div>
        </div>
      </section>
      {modalType && (
        <div className={`${scss.modalWrapper} ${isClosing ? scss.close : ""}`}>
          <ModalConsul type={modalType} onClose={handleCloseModal} />
        </div>
      )}
    </>
  );
};

export default CheckoutSection;

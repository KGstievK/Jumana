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
import ModalConsul from "./ModalConsul";
import axios from "axios";

interface CartItem {
  id: number;
  clothes: {
    clothes_name: string;
    clothes_img: Array<{
      id: number;
      photo: string;
      color: string;
    }>;
  };
  size: string;
  color: number;
  quantity: number;
  price_clothes: string;
  total_price: string;
  color_id: number;
  clothes_id: number;
  just_price: string;
}

interface Cart {
  id: number;
  user: number;
  total_price: string;
  cart_items: CartItem[];
}

interface IOrderPost {
  order_user: number;
  cart_id: number;
  delivery: "курьер" | "самовызов";
  first_name: string;
  phone_number: string;
  city: string;
  address: string;
}

const CheckoutSection = () => {
  const router = useRouter();
  const { data: cart } = useGetCartQuery<{ data: Cart[] }>();
  const [basketData, setBasketData] = useState<CartItem[]>([]);
  const [postOrderMutation] = usePostOrderMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IOrderPost>({
    mode: "onChange",
  });

  const TelegramToken = process.env.NEXT_PUBLIC_TELEGRAM_TOKEN;
  const TelegramChat = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

  const [step, setStep] = useState(1);
  const { data: check } = useGetOrderQuery();
  console.log("🚀 ~ CheckoutSection ~ check:", check);
  const [isClosing, setIsClosing] = useState(false);
  const [modalType, setModalType] = useState<"form" | "success" | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (cart && Array.isArray(cart) && cart[0]?.cart_items) {
      setBasketData(cart[0].cart_items);
    }
  }, [cart]);

  const totalPrice = cart && Array.isArray(cart) && cart[0]?.total_price;

  const handleNextStep = () => {
    const firstName = watch("first_name");
    const phoneNumber = watch("phone_number");
    const city = watch("city");
    const address = watch("address");

    if (!firstName || firstName.trim() === "") {
      setValidationError("Пожалуйста, введите ваше имя");
      return;
    }
    if (!phoneNumber || phoneNumber.trim() === "") {
      setValidationError("Пожалуйста, введите ваш телефон");
      return;
    }
    if (!city || city.trim() === "") {
      setValidationError("Пожалуйста, введите ваш город");
      return;
    }
    if (!address || address.trim() === "") {
      setValidationError("Пожалуйста, введите ваш адрес");
      return;
    }

    setValidationError(null);
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setValidationError(null);
    setStep((prev) => prev - 1);
  };

  const onSubmit: SubmitHandler<IOrderPost> = async (data) => {
    if (!data.delivery) {
      setValidationError("Пожалуйста, выберите способ доставки");
      return;
    }

    if (!cart?.[0]?.id || !cart?.[0]?.user) {
      setValidationError("Ошибка: данные корзины недоступны");
      return;
    }

    const orderData = {
      order_user: cart[0].user,
      cart_id: cart[0].id,
      delivery: data.delivery,
      first_name: data.first_name,
      phone_number: data.phone_number,
      city: data.city,
      address: data.address,
    };

    const messageModel = (data: IOrderPost) => {
      let messageTG = `Кто получатель: <b>${data.first_name}</b>\n`;
      messageTG += `Аккаунт получателя: <b>${cart[0].user}</b>\n`;
      messageTG += `Продукт: 
        название: <b>${cart[0].cart_items.map((e) => e.clothes.clothes_name)}</b>\n
        цвет: <b>${cart[0].cart_items.map((e) => e.color)}</b>\n
        размер: <b>${cart[0].cart_items.map((e) => e.size)}</b>\n
        количество: <b>${cart[0].cart_items.map((e) => e.quantity)}</b>\n
        единица стоимости: <b>${cart[0].cart_items.map(
            (e) => e.price_clothes
          )}</b>\n
        `;
      messageTG += `Стоимость: <b>${cart[0].total_price}</b>\n`;
      messageTG += `Способ получения: <b>${data.delivery}</b>\n`;
      messageTG += `Город: <b>${data.city}</b>\n`;
      messageTG += `Адрес: <b>${data.address}</b>\n`;
      messageTG += `Номер Тел: <b>${data.phone_number}</b>\n`;
      return messageTG;
    };

    try {
      await postOrderMutation(orderData);
      const message = messageModel(data);
      console.log(
        "🚀 ~ constonSubmit:SubmitHandler<IOrderPost>= ~ message:",
        message
      );
      await axios.post(
        `https://api.telegram.org/bot${TelegramToken}/sendMessage`,
        {
          chat_id: TelegramChat,
          parse_mode: "html",
          text: message,
        }
      );
      console.log("Сообщение отправлено в Telegram");
    } catch (error) {
      console.error("Ошибка при оформлении заказа", error);
    }
    console.log(
      "🚀 ~ constonSubmit:SubmitHandler<IOrderPost>= ~ orderData:",
      orderData
    );
  };

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
                            required: "Это поле обязательно",
                            minLength: {
                              value: 2,
                              message: "Минимум 2 символа",
                            },
                          })}
                        />
                        {errors.first_name && (
                          <span className={scss.errorText}>
                            {errors.first_name.message}
                          </span>
                        )}
                      </label>
                      <label>
                        Телефон
                        <input
                          type="tel"
                          placeholder="Введите номер телефона +996"
                          {...register("phone_number", {
                            required: "Это поле обязательно",
                          })}
                        />
                        {errors.phone_number && (
                          <span className={scss.errorText}>
                            {errors.phone_number.message}
                          </span>
                        )}
                      </label>
                      <label>
                        Город
                        <input
                          type="text"
                          placeholder="Введите ваш город"
                          {...register("city", {
                            required: "Это поле обязательно",
                          })}
                        />
                        {errors.city && (
                          <span className={scss.errorText}>
                            {errors.city.message}
                          </span>
                        )}
                      </label>
                      <label>
                        Адрес
                        <input
                          type="text"
                          placeholder="Введите ваш адрес"
                          {...register("address", {
                            required: "Это поле обязательно",
                          })}
                        />
                        {errors.address && (
                          <span className={scss.errorText}>
                            {errors.address.message}
                          </span>
                        )}
                      </label>
                      {validationError && (
                        <div className={scss.errorMessage}>
                          {validationError}
                        </div>
                      )}
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
                          value="самовызов"
                          {...register("delivery", {
                            required: "Выберите способ доставки",
                          })}
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
                          {...register("delivery", {
                            required: "Выберите способ доставки",
                          })}
                        />
                        <div className={scss.radioContent}>
                          <p>Доставка</p>
                          <div className={scss.sum}>
                            <p>за час</p>
                            <p>200с</p>
                          </div>
                        </div>
                      </label>
                      {errors.delivery && (
                        <span className={scss.errorText}>
                          {errors.delivery.message}
                        </span>
                      )}
                      <div className={scss.buttonGroup}>
                        <button
                          className={scss.prevButton}
                          type="button"
                          onClick={handlePrevStep}
                        >
                          Назад
                        </button>
                        <button className={scss.nextButton} type="submit">
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

"use client";
import React, { useState } from "react";
import scss from "./CheckoutSection.module.scss";
import img1 from "@/assets/image.png";
import Image from "next/image";

const CheckoutSection = () => {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <section className={scss.CheckoutSection}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.block_left}>
            {step === 1 && (
              <div className={scss.step}>
                <h2> Личная информация</h2>
                <form className={scss.stepOne}>
                  <label>
                    Имя
                    <input type="text" placeholder="Введите ваше имя" />
                  </label>
                  <label>
                    Телефон
                    <input type="tel" placeholder="Введите ваш телефон" />
                  </label>
                  <label>
                    Город
                    <input type="email" placeholder="Введите вашу почту" />
                  </label>
                  <label>
                    Адрес
                    <input type="email" placeholder="Введите вашу почту" />
                  </label>
                  <button type="button" onClick={handleNextStep}>
                    Далее
                  </button>
                </form>
              </div>
            )}

            {step === 2 && (
              <div className={scss.step}>
                <h2>2. Способ получения</h2>
                <form className={scss.deliveryForm}>
                  <label className={scss.radioLabel}>
                    <input type="radio" name="delivery" value="pickup" />
                    <div className={scss.radioContent}>
                      <p>Самовывоз</p>
                      <p className={scss.deliveryDetail}>1-2 рабочих дней</p>
                    </div>
                  </label>
                  <label className={scss.radioLabel}>
                    <input type="radio" name="delivery" value="delivery" />
                    <div className={scss.radioContent}>
                      <p>Доставка</p>
                      <div className={scss.sum}>
                        <p>за час</p>
                        <p>200с</p>
                      </div>
                    </div>
                  </label>
                  <div className={scss.buttonGroup}>
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className={scss.prevButton}
                    >
                      Назад
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className={scss.nextButton}
                    >
                      Далее
                    </button>
                  </div>
                </form>
              </div>
            )}

            {step === 3 && (
              <div className={scss.step}>
                <h2>3. Оплата</h2>
                <form className={scss.stepOne}>
                  <label>
                    Номер карты:
                    <input type="text" placeholder="0000 0000 0000 0000" />
                  </label>
                  <label>
                    Срок действия:
                    <input type="text" placeholder="MM/YY" />
                  </label>
                  <label>
                    CVV:
                    <input type="password" placeholder="***" />
                  </label>
                  <button type="button" onClick={handlePrevStep}>
                    Назад
                  </button>
                  <button type="submit">Оплатить</button>
                </form>
              </div>
            )}
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
            <button>Продолжить</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutSection;

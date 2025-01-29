"use client";
import React, { useState } from "react";
import styles from "./History.module.scss";
import Image from "next/image";
import { useGetOrderQuery } from "@/redux/api/product";
import OrderStatusModal from "./OrderStatusModal";

const History = () => {
  const { data } = useGetOrderQuery();
  console.log("🚀 ~ History ~ data:", data)
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (order: IOrder) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className={styles.History}>
      <h2>История заказов</h2>
      <p>Отслеживание, возврат или покупка товаров</p>

      <div className={styles.tabs}>
        <div className={styles.tab_active}>
          Текущий <span className={styles.count}>2</span>
        </div>
        <div className={styles.tab}>
          Доставлен <span className={styles.count}>0</span>
        </div>
      </div>

      {data?.map((el: IOrder, index: number) => (
        <div className={styles.content} key={index}>
          <div className={styles.order_card}>
            <div className={styles.order_header}>
              <div className={styles.order_info}>
                <div>
                  <span>Дата заказа</span>
                  <p>{el.date}</p>
                </div>
                <div>
                  <span>Всего</span>
                  <p>{el.cart.total_price} c</p>
                </div>
                <div>
                  <span>Номер заказа</span>
                  <p>#{el.cart.user}</p>
                </div>
              </div>
              <div className={styles.order_status}>
                <span>Статус Заказа</span>
                <button onClick={() => handleOpenModal(el)}>Подробнее</button>
              </div>
            </div>

            <div className={styles.order_items}>
              {el.cart.cart_items.map((item, idx) => {
                const selectedImage = item.clothes.clothes_img.find(
                  (img) => img.id === item.color
                );

                return (
                  <div key={idx} className={styles.item}>
                    <Image
                      src={selectedImage?.photo || "photo"}
                      alt="Product 1"
                      width={100}
                      height={120}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}

      {selectedOrder && (
        <OrderStatusModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          orderData={selectedOrder}
        />
      )}
    </div>
  );
};

export default History;

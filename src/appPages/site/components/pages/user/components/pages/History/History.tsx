"use client";
import React, { useState } from "react";
import styles from "./History.module.scss";
import Image from "next/image";
import { useGetOrderQuery } from "@/redux/api/product";
import OrderStatusModal from "./OrderStatusModal";

type OrderStatus =
  | "Обработка"
  | "заказ собирается"
  | "в процессе доставки"
  | "Доставлен"
  | "Отменен";

interface IOrder {
  id: number;
  date: string;
  order_status: string; // Здесь статус приходит как строка
  cart: {
    user: number;
    total_price: string;
    cart_items: Array<{
      clothes: {
        clothes_name: string;
        clothes_img: Array<{
          id: number;
          photo: string;
          color: string;
        }>;
      };
      color: number;
    }>;
  };
}

const mapToOrderStatus = (status: string): OrderStatus => {
  const normalizedStatus = status.toLowerCase();
  switch (normalizedStatus) {
    case "обработка":
      return "Обработка";
    case "заказ собирается":
      return "заказ собирается";
    case "в процессе доставки":
      return "в процессе доставки";
    case "доставлен":
      return "Доставлен";
    case "отменен":
      return "Отменен";
    default:
      console.warn(`Неизвестный статус: ${status}`);
      return "Обработка"; // Вернем статус по умолчанию
  }
};

const History = () => {
  const { data } = useGetOrderQuery();
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("current");

  const handleOpenModal = (order: IOrder) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const deliveredOrders = data?.filter(
    (order) => order.order_status.toLowerCase() === "доставлен"
  );

  const currentOrders = data?.filter(
    (order) =>
      !["доставлен", "отменен"].includes(order.order_status.toLowerCase())
  );

  const filteredOrders =
    filter === "current"
      ? currentOrders?.map((order) => ({
          ...order,
          cart: {
            ...order.cart,
            cart_items: order.cart.cart_items.filter(
              (item) => item.order_status !== "Доставлен"
            ),
          },
        }))
      : deliveredOrders;

  return (
    <div className={styles.History}>
      <h2>История заказов</h2>
      <p>Отслеживание, возврат или покупка товаров</p>
      <div className={styles.tabs}>
        <div
          className={`${styles.tab} ${
            filter === "current" ? styles.tab_active : ""
          }`}
          onClick={() => setFilter("current")}
        >
          Текущий
          <span className={styles.count}>{currentOrders?.length || 0}</span>
        </div>
        <div
          className={`${styles.tab} ${
            filter === "delivered" ? styles.tab_active : ""
          }`}
          onClick={() => setFilter("delivered")}
        >
          Доставлен
          <span className={styles.count}>{deliveredOrders?.length || 0}</span>
        </div>
      </div>

      {filteredOrders?.map((el: IOrder, index: number) => (
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
                      src={selectedImage?.photo || "/fallback-image.png"}
                      alt="Product"
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
          order_status={{
            ...selectedOrder,
            order_status: mapToOrderStatus(selectedOrder.order_status), // Используем функцию преобразования
          }}
        />
      )}
    </div>
  );
};

export default History;

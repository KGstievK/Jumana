"use client";
import React, { useState } from "react";
import styles from "./History.module.scss";
import Image from "next/image";
import { useGetOrderQuery } from "@/redux/api/product";
import OrderStatusModal from "./OrderStatusModal";

interface IOrder {
  id: number;
  date: string;
  order_status: string;
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

  const filteredOrders = data?.filter((order) =>
    filter === "current"
      ? !["delivered", "cancelled"].includes(order.order_status)
      : order.order_status === "delivered"
  );

  const currentCount =
    data?.filter(
      (order) => !["delivered", "cancelled"].includes(order.order_status)
    ).length || 0;

  const deliveredCount =
    data?.filter((order) => order.order_status === "delivered").length || 0;

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
          Текущий <span className={styles.count}>{currentCount}</span>
        </div>
        <div
          className={`${styles.tab} ${
            filter === "delivered" ? styles.tab_active : ""
          }`}
          onClick={() => setFilter("delivered")}
        >
          Доставлен <span className={styles.count}>{deliveredCount}</span>
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
            order_status: selectedOrder.order_status as OrderStatus,
          }}
        />
      )}
    </div>
  );
};

export default History;

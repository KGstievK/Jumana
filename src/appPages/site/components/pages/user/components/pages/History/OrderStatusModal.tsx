"use client";
import React from "react";
import styles from "./OrderStatusModal.module.scss";
import Image from "next/image";
import { GrBasket } from "react-icons/gr";
import { HiOutlineArrowPath } from "react-icons/hi2";
import { TbTruckDelivery } from "react-icons/tb";
import { FaBoxOpen } from "react-icons/fa6";

type OrderStatus =
  | "Oбработка"
  | "заказ собирается"
  | "в процессе  доставки"
  | "Доставлен"
  | "Отменен";

interface CartItem {
  clothes: {
    clothes_img: Array<{
      id: number;
      photo: string;
    }>;
  };
  color: number;
}

interface Cart {
  total_price: string;
  user: number;
  cart_items: CartItem[];
}

interface IOrder {
  order_status: OrderStatus; 
  date: string;
  cart: Cart;
}

interface OrderStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: IOrder;
}

const OrderStatusModal = ({
  isOpen,
  onClose,
  orderData,
}: OrderStatusModalProps) => {
  if (!isOpen) return null;

  const getTimelineStatus = (
    currentStatus: OrderStatus,
    itemStatus: OrderStatus
  ): boolean => {
    const statusOrder = {
      "Oбработка": 1,
      "заказ собирается": 2,
      "в процессе  доставки": 3,
      "Доставлен": 4,
      "Отменен": 5,
    };

    return statusOrder[currentStatus] >= statusOrder[itemStatus];
  };

  const timelineItems = [
    {
      icon: <GrBasket />,
      status: "Oбработка" as OrderStatus,
      text: "Заказ размещен",
    },
    {
      icon: <HiOutlineArrowPath />,
      status: "заказ собирается" as OrderStatus,
      text: "Собирается",
    },
    {
      icon: <TbTruckDelivery />,
      status: "в процессе  доставки" as OrderStatus,
      text: "В пути",
    },
    {
      icon: <FaBoxOpen />,
      status: "Доставлен" as OrderStatus,
      text: "Доставлен",
    },
    {
      icon: <FaBoxOpen />,
      status: "Отменен" as OrderStatus,
      text: "Отменен",
    },
  ];

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>Статус заказа</h3>
          <button onClick={onClose}>&times;</button>
        </div>

        <div className={styles.statusTimeline}>
          {timelineItems.map((item, index) => (
            <div
              key={index}
              className={`${styles.timelineItem} ${
                getTimelineStatus(orderData.order_status, item.status)
                  ? styles.active
                  : ""
              }`}
            >
              <div className={styles.icon}>{item.icon}</div>
              <p>{item.text}</p>
            </div>
          ))}
        </div>

        <div className={styles.orderInfo}>
          <p>
            {orderData.order_status === "Oбработка"
              ? "Ваш заказ обрабатывается."
              : orderData.order_status === "заказ собирается"
              ? "Ваш заказ собирается."
              : orderData.order_status === "в процессе  доставки"
              ? "Ваш заказ в пути."
              : orderData.order_status === "Доставлен"
              ? "Ваш заказ доставлен"
              : orderData.order_status === "Отменен"
              ? "Ваш заказ отменен."
              : "доставка"}
          </p>
          <div className={styles.orderDetails}>
            <div>
              <span>Дата заказа</span>
              <p>{orderData.date}</p>
            </div>
            <div>
              <span>Всего</span>
              <p>{orderData.cart.total_price} c</p>
            </div>
            <div>
              <span>Номер заказа</span>
              <p>#{orderData.cart.user}</p>
            </div>
          </div>
          <div className={styles.orderItems}>
            {orderData.cart.cart_items.map((item, idx) => {
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
    </div>
  );
};

export default OrderStatusModal;

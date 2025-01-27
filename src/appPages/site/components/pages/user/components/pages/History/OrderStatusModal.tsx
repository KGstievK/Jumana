// components/OrderStatusModal.tsx

"use client";
import React from "react";
import styles from "./OrderStatusModal.module.scss";
import Image from "next/image";
import { GrBasket } from "react-icons/gr";
import { HiOutlineArrowPath } from "react-icons/hi2";
import { TbTruckDelivery } from "react-icons/tb";
import { FaBoxOpen } from "react-icons/fa6";

interface OrderStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: any;
}

const OrderStatusModal = ({
  isOpen,
  onClose,
  orderData,
}: OrderStatusModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>Статус заказа</h3>
          <button onClick={onClose}>&times;</button>
        </div>

        <div className={styles.statusTimeline}>
          <div className={styles.timelineItem + " " + styles.active}>
            <div className={styles.icon}>
              <GrBasket />
            </div>
            <p>Заказ размещен</p>
          </div>

          <div className={styles.timelineItem + " " + styles.active}>
            <div className={styles.icon}>
              <HiOutlineArrowPath />
            </div>
            <p>Собирается</p>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.icon}>
            <TbTruckDelivery />
            </div>
            <p>В пути</p>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.icon}>
            <FaBoxOpen />
            </div>
            <p>Доставлен</p>
          </div>
        </div>

        <div className={styles.orderInfo}>
          <p>Ваш заказ собирается.</p>
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
            {orderData.cart.cart_items.map((item: any, idx: number) => {
              const selectedImage = item.clothes.clothes_img.find(
                (img: any) => img.id === item.color
              );

              return (
                <div key={idx} className={styles.item}>
                  <Image
                    src={selectedImage?.photo || "photo"}
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

"use client";
import Image from "next/image";
import scss from "./newClothes.module.scss";
import arrow from "@/assets/icons/Icon.svg";
import star from "@/assets/images/star.png";
import cart from "@/assets/icons/bag-happyBlack.svg";
import heart from "@/assets/icons/HeartStraight.svg";
import heartRed from "@/assets/icons/red-heart-icon.svg";
import { useState } from "react";
import {
  useGetAllCategoryQuery,
  useGetAllClothesQuery,
} from "@/redux/api/category";

const NewClothesSection = () => {
  const [state, setState] = useState(false);
  const { data } = useGetAllClothesQuery();
  console.log("🚀 ~ NewClothesSection ~ data:", data);
  return (
    <div id={scss.Cards}>
      <div className="container">
        <div className={scss.content}>
          {/* {data?.map((item) => (
            <div key={item.id} className={scss.card}>
              <div className={scss.blockImg}>
                <div className={scss.like}>
                  <div className={scss.star}>
                    <Image src={star} alt="photo" />
                    <h6>{item.average_rating}</h6>
                  </div>
                  <div
                    className={scss.heart}
                    onClick={() => setState((prevState) => !prevState)}
                  >
                    {state ? (
                      <Image src={heartRed} alt="heart" />
                    ) : (
                      <Image src={heart} alt="heart" />
                    )}
                  </div>
                </div>
                <Image
                  src={item.clothes_photo}
                  alt="photo"
                  width={500}
                  height={300}
                  className={scss.mainImg}
                />
                <div className={scss.cart}>
                  <Image src={cart} alt="cart" />
                </div>
              </div>
              <div className={scss.blockText}>
                <div className={scss.productCategory}>
                  <h4>Product Category</h4>
                  <div className={scss.colors}>❤️❤️❤️</div>
                </div>
                <h2>{item.clothes_name}</h2>
                <div className={scss.price}>
                  <span>{item.discount_price}com</span>
                  <del>{item.price}c</del>
                  <div className={scss.cart} onClick={() => "/single"}>
                    <button>Подробнее</button>
                    <Image src={arrow} alt="bag" width={24} height={24} />
                  </div>
                </div>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default NewClothesSection;

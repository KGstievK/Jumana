"use client";
import Image from "next/image";
import scss from "./cards.module.scss";
import star from "@/assets/images/star.png";
import cart from "@/assets/icons/bag-happyBlack.svg";
import heart from "@/assets/icons/HeartStraight.svg";
import heartRed from "@/assets/icons/red-heart-icon.svg";
import { useState } from "react";
import { useRouter } from "next/navigation";
import filterImg from "@/assets/icons/Filter.svg";
import { useGetAllClothesQuery } from "@/redux/api/category";
import SideBar from "../sideBar/SideBar";

const Cards = () => {
  const [state, setState] = useState(false);
  const router = useRouter();
  const { data } = useGetAllClothesQuery();
  console.log("🚀 ~ Cards ~ data:", data);

  return (
    <div id={scss.Cards}>
      <div className={scss.content}>
        <div className={scss.header} onClick={() => <SideBar />}>
          <Image
            width={20}
            height={30}
            layout="intrinsic"
            src={filterImg}
            alt="photo"
          />
          <h4>ФИЛЬТР</h4>
        </div>

        <div className={scss.cards}>
          {data?.map((item, idx) => (
            <div
              key={idx}
              className={scss.card}
              onClick={() => router.push(`/category/${item.id}`)}
            >
              <div className={scss.blockImg}>
                <div className={scss.like}>
                  <div className={scss.star}>
                    <Image
                      width={500}
                      height={300}
                      layout="intrinsic"
                      src={star}
                      alt="photo"
                    />
                    <h6>{item.average_rating}</h6>
                  </div>
                  <div
                    className={scss.heart}
                    onClick={() => setState((prevState) => !prevState)}
                  >
                    {state ? (
                      <Image
                        width={500}
                        height={300}
                        layout="intrinsic"
                        src={heartRed}
                        alt="heart"
                      />
                    ) : (
                      <Image
                        width={500}
                        height={300}
                        layout="intrinsic"
                        src={heart}
                        alt="heart"
                      />
                    )}
                  </div>
                </div>
                <Image
                  width={500}
                  height={300}
                  layout="intrinsic"
                  src={item.clothes_photo}
                  alt="photo"
                  className={scss.mainImg}
                />
                <div className={scss.cart}>
                  <Image layout="intrinsic" src={cart} alt="cart" />
                </div>
              </div>
              <div className={scss.blockText}>
                <div className={scss.productCategory}>
                  <h4>Product Category</h4>
                  <div className={scss.colors}>❤️</div>
                </div>
                <h2>{item.clothes_name}</h2>
                <div className={scss.price}>
                  <span>{item.discount_price}com</span>
                  <del>{item.price}c</del>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cards;

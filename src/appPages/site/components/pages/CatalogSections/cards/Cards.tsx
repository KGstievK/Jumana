"use client";
import Image from "next/image";
import scss from "./cards.module.scss";
import photo from "@/assets/images/cardImage.png";
import star from "@/assets/images/star.png";
import cart from "@/assets/icons/bag-happyBlack.svg";
import heart from "@/assets/icons/HeartStraight.svg";
import heartRed from "@/assets/icons/red-heart-icon.svg";
import { useState } from "react";
import { useRouter } from "next/navigation";
import filterImg from "@/assets/icons/Filter.svg";

const Cards = () => {
  const [state, setState] = useState(false);
  const router = useRouter();

  const data = [
    {
      title: "JUMANA “24",
      price: 6000,
      sale: 20,
      colors: ["red", "white", "black"],
      textstyle: "Таффета",
      description:
        "Красивые платья оптом от производителя из Бишкека , КыргызстанКрасивые платья оптом от производителя из Бишкека , Кыргызстан",
      sales: ["xxs", "xs", "s", "m"],
      starts: 4.95,
    },
    {
      title: "JUMANA “24",
      price: 6000,
      sale: 20,
      colors: ["red", "white", "black"],
      textstyle: "Таффета",
      description:
        "Красивые платья оптом от производителя из Бишкека , КыргызстанКрасивые платья оптом от производителя из Бишкека , Кыргызстан",
      sales: ["xxs", "xs", "s", "m"],
      starts: 4.95,
    },
    {
      title: "JUMANA “24",
      price: 6000,
      sale: 20,
      colors: ["red", "white", "black"],
      textstyle: "Таффета",
      description:
        "Красивые платья оптом от производителя из Бишкека , КыргызстанКрасивые платья оптом от производителя из Бишкека , Кыргызстан",
      sales: ["xxs", "xs", "s", "m"],
      starts: 4.95,
    },
    {
      title: "JUMANA “24",
      price: 6000,
      sale: 20,
      colors: ["red", "white", "black"],
      textstyle: "Таффета",
      description:
        "Красивые платья оптом от производителя из Бишкека , КыргызстанКрасивые платья оптом от производителя из Бишкека , Кыргызстан",
      sales: ["xxs", "xs", "s", "m"],
      starts: 4.95,
    },
  ];

  return (
    <div id={scss.Cards}>
      <div className={scss.content}>
        <div className={scss.header}>
          <Image src={filterImg} alt="photo" />
          <h4>ФИЛЬТР</h4>
        </div>

        <div className={scss.cards}>
          {data.map((item, idx) => (
            <div
              key={idx}
              className={scss.card}
              onClick={() => router.push("/single")}
            >
              <div className={scss.blockImg}>
                <div className={scss.like}>
                  <div className={scss.star}>
                    <Image src={star} alt="photo" />
                    <h6>{item.starts}</h6>
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
                <Image src={photo} alt="photo" className={scss.mainImg} />
                <div className={scss.cart}>
                  <Image src={cart} alt="cart" />
                </div>
              </div>
              <div className={scss.blockText}>
                <div className={scss.productCategory}>
                  <h4>Product Category</h4>
                  <div className={scss.colors}>❤️</div>
                </div>
                <h2>JUMANA “22</h2>
                <div className={scss.price}>
                  <span>{item.price - (item.price * item.sale) / 100}com</span>
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

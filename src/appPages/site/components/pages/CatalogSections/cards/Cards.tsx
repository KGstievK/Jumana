"use client";
import cart from "@/assets/icons/bag-happyBlack.svg";
import filterImg from "@/assets/icons/Filter.svg";
import heart from "@/assets/icons/HeartStraight.svg";
import heartRed from "@/assets/icons/red-heart-icon.svg";
import star from "@/assets/images/star.png";
import { useGetAllCategoryQuery } from "@/redux/api/category";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import SideBar from "../sideBar/SideBar";
import scss from "./cards.module.scss";

interface Iprops {
  value: string;
  sizes: string[];
  color: string; // Строка вместо массива
}

const Cards: FC<Iprops> = ({ value, sizes, color }) => {
  console.log("🚀 ~ colors:", color);

  const router = useRouter();
  const [state, setState] = useState(false);
  const { data } = useGetAllCategoryQuery();
  const [datas, setDatas] = useState(data);

  console.log("🚀 ~ data:", datas);

  useEffect(() => {
    if (data) {
      let filteredData = data;

      // Фильтрация по категории
      if (value) {
        console.log("Фильтруем по категории:", value);
        filteredData = filteredData.filter(
          (el) => el.category_name.toLowerCase() === value.toLowerCase()
        );
        console.log("После фильтрации по категории:", filteredData);
      }

      // Фильтрация по цене
      // filteredData = filteredData.filter((el) =>
      //   el.clothes_category.some(
      //     (item) => item.price >= priceRange.min && item.price <= priceRange.max
      //   )
      // );

      // Фильтрация по размеру
      if (sizes.length > 0) {
        filteredData = filteredData.filter((el) =>
          el.clothes_category.some(
            (item) =>
              Array.isArray(item.size) &&
              item.size.some((s) => sizes.includes(s.toUpperCase()))
          )
        );
      }

      // Фильтрация по цвету
      if (color) {
        filteredData = filteredData.filter((el) =>
          el.clothes_category.some((item) =>
            item.color.some(
              (c) => c.color.toLowerCase() === color.toLowerCase()
            )
          )
        );
      }

      setDatas(filteredData);
    }
  }, [data, value, sizes, color]);

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
          {datas?.map((el, idx) =>
            el.clothes_category.map((item) => (
              <div
                key={idx}
                className={scss.card}
                onClick={() => router.push(`/${item.id}`)}
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
                    <span>
                      {item.discount_price === 0 ? null : item.discount_price}
                      com
                    </span>
                    <del>{item.price}c</del>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Cards;

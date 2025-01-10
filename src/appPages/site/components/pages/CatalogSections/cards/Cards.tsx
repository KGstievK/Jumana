import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetAllCategoryQuery } from "@/redux/api/category";
import Image from "next/image";
import SideBar from "../sideBar/SideBar";
import scss from "./cards.module.scss";
import cart from "@/assets/icons/bag-happyBlack.svg";
import filterImg from "@/assets/icons/Filter.svg";
import heart from "@/assets/icons/HeartStraight.svg";
import heartRed from "@/assets/icons/red-heart-icon.svg";
import star from "@/assets/images/star.png";

interface Iprops {
  value: string;
  size: string;
  color: string;
}

const Cards: FC<Iprops> = ({ value, size, color }) => {
  const router = useRouter();
  const { data } = useGetAllCategoryQuery();
  const [datas, setDatas] = useState(data);
  const [likedItems, setLikedItems] = useState<number[]>([]);

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Остановить всплытие события
    setLikedItems(
      (prevLikedItems) =>
        prevLikedItems.includes(id)
          ? prevLikedItems.filter((itemId) => itemId !== id) // Удалить из избранного
          : [...prevLikedItems, id] // Добавить в избранное
    );
  };

  useEffect(() => {
    if (data) {
      let filteredData = data;

      // Фильтрация по категории
      if (value) {
        filteredData = filteredData.filter(
          (el) => el.category_name.toLowerCase() === value.toLowerCase()
        );
      }

      // Фильтрация по размеру
      if (size) {
        filteredData = filteredData.filter((el) =>
          el.clothes_category.some(
            (item) =>
              Array.isArray(item.size) &&
              item.size.some((s) => s.toUpperCase() === size.toUpperCase())
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
  }, [data, value, size, color]);

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
                key={item.id}
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
                      onClick={(e) => toggleLike(item.id, e)}
                    >
                      {likedItems.includes(item.id) ? (
                        <Image
                          width={300}
                          height={200}
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
                  <div
                    className={scss.cart}
                    onClick={(e) => e.stopPropagation()}
                  >
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
                      {item.discount_price}
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

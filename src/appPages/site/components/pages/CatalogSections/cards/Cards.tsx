import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useDeleteFavoriteMutation,
  useGetAllCategoryQuery,
  usePostToFavoriteMutation,
} from "@/redux/api/category";
import Image from "next/image";
import SideBar from "../sideBar/SideBar";
import scss from "./cards.module.scss";
import cart from "@/assets/icons/bag-happyBlack.svg";
import heart from "@/assets/icons/HeartStraight.svg";
import heartRed from "@/assets/icons/red-heart-icon.svg";
import star from "@/assets/images/star.png";
import ColorsClothes from "../../../ui/colors/Colors";

const Cards: FC<{ value: string; size: string; color: string }> = ({
  value,
  size,
  color,
}) => {
  const router = useRouter();
  const { data } = useGetAllCategoryQuery();
  const [datas, setDatas] = useState(data);
  const [likedItems, setLikedItems] = useState<any[]>([]);

  const [postToFavorite] = usePostToFavoriteMutation();
  const [deleteFavorite] = useDeleteFavoriteMutation();

  const toggleLike = async (item: any) => {
    try {
      // Проверяем, есть ли товар уже в избранном
      if (likedItems.some((likedItem) => likedItem.id === item.id)) {
        // Если есть, удаляем из избранного
        await deleteFavorite(item); // Отправляем объект
        setLikedItems(
          (prev) => prev.filter((likedItem) => likedItem.id !== item.id) // Убираем из массива
        );
      } else {
        // Если нет, добавляем в избранное
        await postToFavorite(item); // Отправляем объект
        setLikedItems((prev) => [...prev, item]); // Добавляем объект в массив
      }
    } catch (error) {
      console.error("Ошибка при обновлении избранного:", error);
    }
  };
  useEffect(() => {
    if (data) {
      let filteredData = data;

      if (value) {
        filteredData = filteredData.filter(
          (el) => el.category_name.toLowerCase() === value.toLowerCase()
        );
      }

      if (size) {
        filteredData = filteredData.filter((el) =>
          el.clothes_category.some(
            (item) =>
              Array.isArray(item.size) &&
              item.size.some((s) => s.toUpperCase() === size.toUpperCase())
          )
        );
      }

      if (color) {
        filteredData = filteredData.filter((el) =>
          el.clothes_category.some((item) =>
            item.clothes_img.some(
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
        <div className={scss.cards}>
          {datas?.map((el) =>
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
                        alt="photo"
                        src={star}
                      />
                      <h6>{item.average_rating}</h6>
                    </div>
                    <div
                      className={scss.heart}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(item); // Передаём объект,
                      }}
                    >
                      <Image
                        width={24}
                        height={24}
                        src={
                          likedItems.some(
                            (likedItem) => likedItem.id === item.id
                          )
                            ? heartRed
                            : heart
                        }
                        alt="heart"
                      />
                    </div>
                  </div>
                  {item.clothes_img.slice(0, 1).map((el, index) => (
                    <Image
                      key={index}
                      width={5000}
                      height={3000}
                      layout="intrinsic"
                      src={el.photo}
                      alt="photo"
                      className={scss.mainImg}
                    />
                  ))}
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
                    <div className={scss.colors}>
                      <ColorsClothes
                        clothesImg={item.clothes_img.slice(0, 3)}
                      />
                    </div>
                  </div>
                  <h2>{item.clothes_name}</h2>
                  <div className={scss.price}>
                    <span>
                      {Math.round(item.discount_price)}
                      com
                    </span>
                    <del>{Math.round(item.price)}c</del>
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

import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useDeleteFavoriteMutation,
  useGetAllCategoryQuery,
  useGetToFavoriteQuery,
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

// interface IProps {
//   id: number;
//   promo_category: Array<{
//     promo_category: string;
//   }>;
//   clothes_name: string;
//   price: number;
//   discount_price: number;
//   size: Array<string>;
//   average_rating: number;
//   created_date: string;
//   clothes_img: Array<{
//     photo: string;
//     color: string;
//   }>;
// }
const Cards: FC<{ value: string; size: string; color: string }> = ({
  value,
  size,
  color,
}) => {
  const router = useRouter();
  const { data } = useGetAllCategoryQuery();
  const [datas, setDatas] = useState(data);
  const [likedItems, setLikedItems] = useState<any[]>([]); // Локальное состояние для отслеживания избранных товаров
  const [postToFavorite] = usePostToFavoriteMutation();
  const [deleteFavorite] = useDeleteFavoriteMutation();

  const toggleLike = async (item: PostToFavorite) => {
    console.log("🚀 ~ toggleLike ~ item:", item);

    const isLiked = likedItems.includes(item.clothes_id); // Проверяем, есть ли товар в избранном

    const requestBody = {
      clothes: {
        promo_category: item.clothes.promo_category,
        clothes_name: item.clothes.clothes_name,
        price: item.clothes.price,
        size: item.clothes.size, // Берем первый размер, если он существует
      },
      clothes_id: item.clothes_id, // Используем id как clothes_id
      favorite_user: item.favorite_user, // Пример ID пользователя, его можно передавать динамически
    };
    console.log("🚀 ~ toggleLike ~ requestBody:", requestBody);

    try {
      if (isLiked) {
        // Удаляем товар из избранного
        await deleteFavorite(item.clothes_id);
        // Обновляем локальное состояние, чтобы отразить удаление
        setLikedItems((prev) => prev.filter((id) => id !== item.clothes_id)); // Обновляем состояние
      } else {
        // Добавляем товар в избранное
        await postToFavorite(requestBody);
        // Обновляем локальное состояние, чтобы отразить добавление
        setLikedItems((prev) => [...prev, item.clothes_id]); // Обновляем состояние
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
                        toggleLike(item);
                      }}
                    >
                      <Image
                        width={24}
                        height={24}
                        src={
                          likedItems.includes(item.id) // Проверяем по локальному состоянию
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

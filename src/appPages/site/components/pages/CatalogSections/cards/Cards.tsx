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

// Типы для данных
interface PromoCategory {
  promo_category: string;
}

interface ClothesImg {
  id: number;
  photo: string;
  color: string;
}
interface IpostFav {
  id: number;
  promo_category: PromoCategory[];
  clothes_name: string;
  price: number;
  discount_price: number; // Ожидаем число
  size: string[];
  average_rating: string;
  created_date: string;
  clothes_img: ClothesImg[];
}

interface ClothesCategoryItem {
  clothes_category: Array<{
    id: number;
    promo_category: Array<{
      promo_category: string;
    }>;
    clothes_name: string;
    price: number;
    discount_price: number;
    size: Array<string>;
    average_rating: number;
    created_date: string;
    clothes_img: Array<{
      photo: string;
      color: string;
    }>;
  }>;
}

const Cards: FC<{ value: string; size: string; color: string }> = ({
  value,
  size,
  color,
}) => {
  const router = useRouter();
  const { data } = useGetAllCategoryQuery();
  const [datas, setDatas] = useState(data);
  console.log("🚀 ~ datas:", datas);
  const [likedItems, setLikedItems] = useState<any[]>([]); // Локальное состояние для отслеживания избранных товаров
  const [postToFavorite] = usePostToFavoriteMutation();
  const [deleteFavorite] = useDeleteFavoriteMutation();

  // const toggleLike = async (clothesItem: ClothesCategoryItem) => {
  //   const isLiked = likedItems.includes(clothesItem.);

  // const requestBody: IpostFav = {
  //   clothes: {
  //     promo_category: [
  //       { promo_category: "Category1" }, // Замените "Category1" на ваше значение
  //       { promo_category: "Category2" }, // Добавьте столько объектов, сколько вам нужно
  //     ],
  //     clothes_name: clothesItem.,
  //     price: clothesItem.price,
  //     size: clothesItem.size.join(", "), // Если size - массив, объедините его в строку
  //   },
  //   clothes_id: clothesItem.id,
  //   favorite_user: 0,
  // };

  // {
  //   clothes: {
  //     promo_category: clothesItem.promo_category,
  //     clothes_name: clothesItem.clothes_name,
  //     price: clothesItem.price,
  //     size: clothesItem.size.join(", "), // Если size - массив, можно объединить его в строку
  //   },
  //   clothes_id: clothesItem.id,
  //   favorite_user: 0,
  // };
  //   try {
  //     if (isLiked) {
  //       await deleteFavorite(clothesItem.id);
  //       setLikedItems((prev) => prev.filter((id) => id !== clothesItem.id));
  //     } else {
  //       await postToFavorite(requestBody);
  //       setLikedItems((prev) => [...prev, clothesItem.id]);
  //     }
  //   } catch (error) {
  //     console.error("Ошибка при обновлении избранного:", error);
  //   }
  // };

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
                        // toggleLike(item);
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
                      {Math.round(item.discount_price).toString()} com
                    </span>
                    <del>{Math.round(item.price)} c</del>
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

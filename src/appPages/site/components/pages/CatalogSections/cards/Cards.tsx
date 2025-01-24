import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useDeleteFavoriteMutation,
  useGetAllCategoryQuery,
  useGetToFavoriteQuery,
  usePostToFavoriteMutation,
} from "@/redux/api/category";
import Image from "next/image";
import scss from "./cards.module.scss";
import heart from "@/assets/icons/HeartStraight.svg";
import heartRed from "@/assets/icons/red-heart-icon.svg";
import star from "@/assets/images/star.png";
import ColorsClothes from "../../../ui/colors/Colors";

interface ClothesCategoryItem {
  clothes_category: Array<{
    id: number;
    promo_category: Array<{
      promo_category: string;
    }>;
    clothes_name: string;
    clothes_id?: number;
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
  const [postToFavorite] = usePostToFavoriteMutation();
  const [deleteFavorite] = useDeleteFavoriteMutation();

  const { data: favoriteItems } = useGetToFavoriteQuery();

  const handleFavoriteClick = async (
    e: React.MouseEvent,
    item: ClothesCategoryItem["clothes_category"][0]
  ) => {
    e.stopPropagation();

    const isFavorite = favoriteItems?.some((fav) => fav.clothes.id === item.id);

    try {
      if (isFavorite) {
        const favoriteItem = favoriteItems?.find(
          (fav) => fav.clothes.id === item.id
        );
        if (favoriteItem) {
          await deleteFavorite(favoriteItem.id);
        }
      } else {
        await postToFavorite({
          clothes: {
            promo_category: item.promo_category,
            clothes_name: item.clothes_name,
            price: item.price,
            size: item.size[0],
          },
          clothes_id: item.id,
          favorite_user: 1,
        });
      }
    } catch (error) {
      console.error("Favori işlemi başarısız:", error);
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
                        e.stopPropagation(), handleFavoriteClick(e, item);
                      }}
                    >
                      <Image
                        width={24}
                        height={24}
                        src={
                          favoriteItems?.some(
                            (fav) => fav.clothes.id === item.id
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
                      {Math.round(item.discount_price).toString()} cом
                    </span>
                    <del>{Math.round(item.price)} cом</del>
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

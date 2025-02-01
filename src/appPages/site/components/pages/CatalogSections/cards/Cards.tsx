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
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Link from "next/link";

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

const Cards: FC<{
  value: string;
  size: string;
  color: string;
  priceRange: [number, number];
}> = ({ value, size, color, priceRange }) => {
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
            (item: { size: any[] }) =>
              Array.isArray(item.size) &&
              item.size.some(
                (s: string) => s.toUpperCase() === size.toUpperCase()
              )
          )
        );
      }

      if (color) {
        filteredData = filteredData.filter((el) =>
          el.clothes_category.some((item: { clothes_img: any[] }) =>
            item.clothes_img.some(
              (c: { color: string }) =>
                c.color.toLowerCase() === color.toLowerCase()
            )
          )
        );
      }

      if (priceRange) {
        filteredData = filteredData.filter((el) =>
          el.clothes_category.some(
            (item: { discount_price: number }) =>
              item.discount_price >= priceRange[0] &&
              item.discount_price <= priceRange[1]
          )
        );
      }

      setDatas(filteredData);
    }
  }, [data, value, size, color, priceRange]);

  return (
    <div id={scss.Cards}>
      <div className={scss.content}>
        <div className={scss.cards}>
          {datas?.map((el) =>
            el.clothes_category.map(
              (item: {
                id: any;
                average_rating: any;
                clothes_img: any;
                clothes_name: any;
                discount_price: any;
                price: any;
                promo_category?: { promo_category: string }[];
                clothes_id?: number | undefined;
                size?: string[];
                created_date?: string;
              }) => (
                <div key={item.id} className={scss.card}>
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
                          e.stopPropagation(), handleFavoriteClick(e, item.id);
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
                    {item.clothes_img
                      .slice(0, 1)
                      .map(
                        (
                          el: { photo: string | StaticImport },
                          index: React.Key | null | undefined
                        ) => (
                          <Link href={`/${item.id}`}>
                            <Image
                              key={index}
                              width={5000}
                              height={3000}
                              layout="intrinsic"
                              src={el.photo}
                              alt="photo"
                              className={scss.mainImg}
                            />
                          </Link>
                        )
                      )}
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
              )
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Cards;

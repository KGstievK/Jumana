"use client";
import Image from "next/image";
import scss from "./Popular.module.scss";
import Link from "next/link";
import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/navigation";
import star from "@/assets/icons/Star.svg";
import arrow from "@/assets/icons/arrow.svg";
import heart from "@/assets/icons/HeartStraight.svg";
import heartRed from "@/assets/icons/red-heart-icon.svg";

import {
  useDeleteFavoriteMutation,
  useGetAllClothesQuery,
  useGetToFavoriteQuery,
  usePostToFavoriteMutation,
} from "@/redux/api/category";
import { useRouter } from "next/navigation";
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

const Popular = () => {
  const { data } = useGetAllClothesQuery();
  const newArrivals = data?.filter((item) =>
    item.promo_category.some(
      (category) => category.promo_category.toLowerCase() === "популярные"
    )
  );
  const router = useRouter();

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

  return (
    <section className={scss.Popular}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.navigate_title}>
            <h1 className="title">Популярные товары</h1>
            <Link href="/popular">
              <button>
                Посмотреть все <Image src={arrow} alt="arrow" />
              </button>
            </Link>
          </div>
          <ul>
            <li>туника</li>
            <li>платье</li>
            <li>платок</li>
          </ul>
          <div className={scss.cards}>
            {newArrivals?.map((item) => (
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
            ))}
          </div>
          <div className={scss.navigate_mobile}>
            <Link href="/popular">
              <button>
                Посмотреть все <Image src={arrow} alt="arrow" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Popular;

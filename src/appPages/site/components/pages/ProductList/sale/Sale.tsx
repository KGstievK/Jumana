"use client";
import Image from "next/image";
import scss from "./sale.module.scss";
import arrow from "@/assets/icons/Icon.svg";
import star from "@/assets/images/star.png";
import cart from "@/assets/icons/bag-happyBlack.svg";
import heart from "@/assets/icons/HeartStraight.svg";
import heartRed from "@/assets/icons/red-heart-icon.svg";
import { useState } from "react";
import {
  useDeleteFavoriteMutation,
  useGetAllClothesQuery,
  useGetToFavoriteQuery,
  usePostToFavoriteMutation,
} from "@/redux/api/category";
import ColorsClothes from "../../../ui/colors/Colors";
import { useRouter } from "next/navigation";
import Link from "next/link";
import backIcon from "@/assets/icons/backIcon.svg";

const SalePage = () => {
  const router = useRouter();

  const [state, setState] = useState(false);
  const { data } = useGetAllClothesQuery();
  console.log("🚀 ~ NewClothesSection ~ data:", data);
  const newArrivals = data?.filter((item) =>
    item.promo_category.some(
      (category) => category.promo_category.toLowerCase() === "скидки"
    )
  );

  return (
    <div id={scss.Cards}>
      <div className="container">
        <div className={scss.header}>
          <Image src={backIcon} alt="icon " width={22} height={22} />
          <Link href="/">Главная</Link>/<Link href="/sale">Скидки</Link>
        </div>
        <h1 className={scss.title}>Скидки</h1>
        <div className={scss.content}>
          {newArrivals?.map((item) => (
            <div key={item.id} className={scss.card}>
              <div className={scss.blockImg}>
                <div className={scss.like}>
                  <div className={scss.star}>
                    <Image src={star} alt="photo" />
                    <h6>{item.average_rating}</h6>
                  </div>
                  {/* <div
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
                        likedItems.some((likedItem) => likedItem.id === item.id)
                          ? heartRed
                          : heart
                      }
                      alt="heart"
                    />
                  </div> */}
                </div>

                <Image
                  src={item.clothes_img[0].photo}
                  alt="photo"
                  width={500}
                  height={300}
                  className={scss.mainImg}
                />

                <div className={scss.cart}>
                  <Image src={cart} alt="cart" />
                </div>
              </div>
              <div className={scss.blockText}>
                <div className={scss.productCategory}>
                  <h4>Product Category</h4>
                  <div className={scss.colors}>
                    <ColorsClothes clothesImg={item.clothes_img.slice(0, 3)} />
                  </div>
                </div>
                <h2>{item.clothes_name}</h2>
                <div className={scss.price}>
                  <span>{item.discount_price}com</span>
                  <del>{item.price}c</del>
                  <div
                    className={scss.cart}
                    onClick={() => router.push(`/${item.id}`)}
                  >
                    <button>Подробнее</button>
                    <Image src={arrow} alt="bag" width={24} height={24} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalePage;

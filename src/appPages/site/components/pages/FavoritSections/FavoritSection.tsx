"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Image from "next/image";
import scss from "./FavoritSection.module.scss";
import { useRouter } from "next/navigation";
import star from "@/assets/images/star.png";
import cart from "@/assets/icons/bag-happyBlack.svg";

interface ClothesCategory {
  id: number;
  average_rating: number;
  clothes_photo: string;
  clothes_name: string;
  discount_price: string;
  price: string;
}

const Favorite = () => {
  const router = useRouter();
  const favorites = useSelector((state: RootState) => state.favorite.favorites);
  console.log("🚀 ~ Favorite ~ favorites:", favorites);

  return (
    <div className={scss.FavoritSection}>
      <div className={scss.content}>
        {favorites.map((item: ClothesCategory) => (
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
              </div>
              <Image
                width={500}
                height={300}
                layout="intrinsic"
                src={item.clothes_photo}
                alt="photo"
                className={scss.mainImg}
              />
              <div className={scss.cart} onClick={(e) => e.stopPropagation()}>
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
        ))}
      </div>
    </div>
  );
};

export default Favorite;

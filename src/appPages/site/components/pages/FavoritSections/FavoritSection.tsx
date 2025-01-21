"use client";
import Image from "next/image";
import scss from "./FavoritSection.module.scss";
import { useRouter } from "next/navigation";
import star from "@/assets/images/star.png";
import cart from "@/assets/icons/bag-happyBlack.svg";
import {
  useDeleteFavoriteMutation,
  useGetToFavoriteQuery,
} from "@/redux/api/category";
import ColorsClothes from "../../ui/colors/Colors";

const Favorite = () => {
  const router = useRouter();
  const { data } = useGetToFavoriteQuery();
  console.log("🚀 ~ Favorite ~ data:", data);

  const [deleteFavorite] = useDeleteFavoriteMutation();

  return (
    <div className={scss.FavoritSection}>
      <div className={scss.content}>
        {data?.map((item) => (
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
                  <h6>{item.clothes.average_rating}</h6>
                </div>
              </div>
              <Image
                width={500}
                height={300}
                layout="intrinsic"
                src={item.clothes.clothes_img[0].photo}
                alt="photo"
                className={scss.mainImg}
              />
              <div className={scss.cart} onClick={(e) => e.stopPropagation()}>
                <Image
                  width={300}
                  height={300}
                  layout="intrinsic"
                  src={cart}
                  alt="cart"
                />
              </div>
            </div>
            <div className={scss.blockText}>
              <div className={scss.productCategory}>
                <h4>Product Category</h4>
                <div className={scss.colors}>
                  <ColorsClothes
                    clothesImg={item.clothes.clothes_img.slice(0, 3)}
                  />
                </div>
              </div>
              <h2>{item.clothes.clothes_name}</h2>
              <div className={scss.price}>
                <span>
                  {item.clothes.discount_price}
                  com
                </span>
                <del>{item.clothes.price}c</del>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteFavorite(item.id);
                }}
              >
                delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorite;

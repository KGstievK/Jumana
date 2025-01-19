"use client";
import star from "@/assets//images//star.png";
import backIcon from "@/assets/icons/backIcon.svg";
import bagSvg from "@/assets/icons/bag-happy.svg";
import Image from "next/image";
import Link from "next/link";
import scss from "./SinglePageSection.module.scss";
import { useAddToBasketMutation } from "@/redux/api/product";
import { useGetClothesByIdQuery } from "@/redux/api/category";
import { useParams, useRouter } from "next/navigation";
import ColorsClothes from "../../ui/colors/Colors";
import { FC, useState, useEffect } from "react";

//! Это Карточка товаров
interface IClothesImage {
  photo: string;
}

interface IProps {
  clothes_img: IClothesImage[];
}

const sizes = ["xxs", "xs", "s", "M", "L", "XL", "XXL"];

const SinglePageSection: FC = () => {
  const id = useParams();
  const { data } = useGetClothesByIdQuery(Number(id.single));
  console.log("🚀 ~ data:", data);

  const [selectedPhoto, setSelectedPhoto] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (data && data.clothes_img.length > 0) {
      setSelectedPhoto(data.clothes_img[0].photo);
    }
  }, [data]);

  const handleThumbnailClick = (photo: string) => {
    setSelectedPhoto(photo);
  };
  const route = useRouter();
  const [addBasketMutation] = useAddToBasketMutation();

 

  if (!data) {
    return <div>Загрузка данных, подождите...</div>;
  }

  return (
    <section className={scss.SinglePageSection}>
      <div className="container">
        <div className={scss.header}>
          <Link href="/catalog">
            <Image src={backIcon} alt="icon" width={22} height={22} />
          </Link>
          <Link href="/">Главная</Link>/<Link href="/catalog">Категории</Link>/
          <Link href="">{data.clothes_name}</Link>
        </div>

        <div className={scss.content}>
          <div className={scss.images}>
            <div className={scss.mainImg}>
              <Image
                src={selectedPhoto || "/src/assets/image.png"}
                alt="Selected photo"
                width={6000}
                height={5000}
              />
            </div>
            <div className={scss.thumbnails}>
              {data.clothes_img.map((el, index) => (
                <div
                  key={index}
                  className={`${scss.thumbnail} ${
                    el.photo === selectedPhoto ? scss.activeThumbnail : ""
                  }`}
                  onClick={() => handleThumbnailClick(el.photo)}
                >
                  <Image
                    src={el.photo}
                    alt={`Thumbnail ${index + 1}`}
                    width={2500}
                    height={2500}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className={scss.info}>
            <div className={scss.headLine}>
              <h3>Категория товара</h3>
              <div className={scss.mark}>
                <Image src={star} alt="star" width={24} height={24} />
                <h6>{data?.average_rating}</h6>
              </div>
            </div>
            <h1>{data?.clothes_name}</h1>

            <div className={scss.price}>
              <del>{data.price} сом</del>
              <h4>{Math.round(data?.discount_price)} сом</h4>
            </div>

            <div className={scss.colors}>
              <h5>Цвета:</h5>
              <ColorsClothes clothesImg={data?.clothes_img} />
            </div>
            <div className={scss.textile}>
              <h5>Ткань:</h5>
              <h4>
                {data?.textile_clothes.map(
                  (el) =>
                    el.textile_name.charAt(0).toUpperCase() +
                    el.textile_name.slice(1).toLowerCase()
                )}
              </h4>
            </div>
            <div className={scss.description}>
              <p>{data.clothes_description}</p>
            </div>
            <div className={scss.sizes}>
              <h5>Размеры:</h5>
              <div className={scss.spans}>
                {typeof data.size == "string" ? (
                  <span>{data.size}</span>
                ) : (
                  data?.size?.map((el, index) => <span key={index}>{el}</span>)
                )}
              </div>
            </div>

            <div className={scss.quantity}>
              <h3>Количество:</h3>
              <div className={scss.groupOfBtn}>
                <div className={scss.counter}>
                  <button>-</button>
                  <span>1</span>
                  <button>+</button>
                </div>
                <div className={scss.cart}>
                  <button
                    onClick={() => {
                      route.push("/cart");
                      addBasketMutation(data);
                    }}
                  >
                    В корзинку
                  </button>
                  <Image src={bagSvg} alt="bag" width={24} height={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SinglePageSection;

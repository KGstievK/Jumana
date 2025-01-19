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
import React, { FC, useState, useEffect } from "react";
import Sizes from "./sizes/Sizes";

//! Это Карточка товаров
interface IClothesImage {
  photo: string;
}

interface IProps {
  clothes_img: IClothesImage[];
}

interface IObj {
  size: string;
  photo: string;
  color: string;
}
const sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];

const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const SinglePageSection: FC = () => {
  const id = useParams();
  const { data } = useGetClothesByIdQuery(Number(id.single));
  const [selectedPhoto, setSelectedPhoto] = useState<string | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [value, setValue] = useState<IObj>({ size: "", photo: "", color: "" });
  const [addBasketMutation] = useAddToBasketMutation();


  const updateValue = (key: keyof IObj, newValue: string) => {
    setValue((prev) => ({ ...prev, [key]: newValue }));
  };

  useEffect(() => {
    if (data?.clothes_img?.length) {
      setSelectedPhoto(data.clothes_img[0].photo);
    }
  }, [data]);

  if (!data) return <div>Загрузка данных...</div>;

  const {
    clothes_name,
    clothes_description,
    price,
    discount_price,
    size: availableSizes,
    textile_clothes,
    clothes_img,
    average_rating,
  } = data;


  return (
    <section className={scss.SinglePageSection}>
      <div className="container">
        <div className={scss.header}>
          <Link href="/catalog">
            <Image src={backIcon} alt="icon" width={22} height={22} />
          </Link>
          <Link href="/">Главная</Link>/<Link href="/catalog">Категории</Link>/
          <Link href="">{clothes_name}</Link>
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
              {clothes_img.map((el, index) => (
                <div
                  key={index}
                  className={`${scss.thumbnail} ${
                    el.photo === selectedPhoto ? scss.activeThumbnail : ""
                  }`}
                  onClick={() => {
                    updateValue("photo", el.photo);
                    setSelectedPhoto(el.photo);
                  }}
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
                <h6>{average_rating}</h6>
              </div>
            </div>
            <h1>{clothes_name}</h1>
            <div className={scss.price}>
              <del>{price} сом</del>
              <h4>{Math.round(discount_price)} сом</h4>
            </div>
            <div className={scss.colors}>
              <h5>Цвета:</h5>
              <ColorsClothes
                clothesImg={clothes_img}
                onClick={(color) => updateValue("color", color)}
              />
            </div>
            <div className={scss.textile}>
              <h5>Ткань:</h5>
              <h4>
                {textile_clothes
                  .map((el) => capitalize(el.textile_name))
                  .join(", ")}
              </h4>
            </div>
            <div className={scss.description}>
              <p>{clothes_description}</p>

            </div>
            <div className={scss.sizes}>
              <h5>Размеры:</h5>
              <Sizes
                sizes={sizes}
                availableSizes={availableSizes}
                selectedSize={selectedSize}
                onClick={(size) => {
                  updateValue("size", size);
                  setSelectedSize(size);
                }}
              />
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
                  <button>В корзинку</button>

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

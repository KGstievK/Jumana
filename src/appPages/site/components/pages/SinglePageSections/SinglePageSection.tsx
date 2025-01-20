"use client";
import star from "@/assets//images//star.png";
import backIcon from "@/assets/icons/backIcon.svg";
import bagSvg from "@/assets/icons/bag-happy.svg";
import Image from "next/image";
import Link from "next/link";
import scss from "./SinglePageSection.module.scss";
import { useAddToBasketMutation } from "@/redux/api/product";
import { useGetClothesByIdQuery } from "@/redux/api/category";
import { useParams } from "next/navigation";
import ColorsClothes from "../../ui/colors/Colors";
import React, { FC, useState, useEffect } from "react";
import Sizes from "./sizes/Sizes";

//! Это Карточка товаров

interface IObj {
  size: string;
  color: {
    id: number | null;
    photo: string;
    color: string;
  };
  id: number | null;
}

const sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];

const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const SinglePageSection: FC = () => {
  const id = useParams();
  const { data } = useGetClothesByIdQuery(Number(id.single));
  const [selectedPhoto, setSelectedPhoto] = useState<string | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [value, setValue] = useState<IObj>({
    size: "",
    id: null,
    color: {
      id: null,
      photo: "",
      color: "",
    },
  });
  const [count, setCounter] = useState<number>(1);
  const [addBasketMutation] = useAddToBasketMutation();

  const updateValue = (key: keyof IObj, newValue: any) => {
    setValue((prev) => ({ ...prev, [key]: newValue }));
  };

  useEffect(() => {
    if (data?.clothes_img?.length) {
      setSelectedPhoto(data.clothes_img[0].photo);
    }

    if (data?.id) {
      setValue((prev) => ({ ...prev, id: data.id }));
    }
  }, [data]);

  if (!data) return <div>Загрузка данных...</div>;

  const incrementCount = () => {
    setCounter((prevCount) =>
      prevCount < data.quantities ? prevCount + 1 : prevCount
    );
  };

  const decrementCount = () => {
    setCounter((prevCount) => (prevCount > 1 ? prevCount - 1 : prevCount));
  };

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
                    updateValue("color", {
                      id: el.id,
                      photo: el.photo,
                      color: el.color,
                    });
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
                onClick={(item) =>
                  setValue((prev) => ({
                    ...prev,
                    color: {
                      id: item.id ?? null,
                      photo: item.photo,
                      color: item.color,
                    },
                  }))
                }
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
                  <button onClick={decrementCount} disabled={count === 1}>
                    -
                  </button>
                  <span>{count}</span>
                  <button onClick={incrementCount}>+</button>
                </div>
                <div className={scss.cart}>
                  <button
                    onClick={() => {
                      if (!value.size || !value.color.id || !value.id) {
                        alert("Выберите размер и цвет товара!");
                        return;
                      }

                      const payload = {
                        clothes_id: value.id,
                        quantity: count,
                        size: value.size,
                        color_id: value.color.id,
                      };

                      console.log("Отправляем данные:", payload);

                      addBasketMutation(payload)
                        .then(() => alert("Товар добавлен в корзину!"))
                        .catch((error) => {
                          console.error("Ошибка добавления в корзину:", error);
                          alert("Произошла ошибка при добавлении товара.");
                        });
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

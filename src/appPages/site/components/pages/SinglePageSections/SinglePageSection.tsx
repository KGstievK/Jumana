"use client";
import star from "@/assets/images/star.png";
import backIcon from "@/assets/icons/backIcon.svg";
import bagSvg from "@/assets/icons/bag-happy.svg";
import Image from "next/image";
import Link from "next/link";
import scss from "./SinglePageSection.module.scss";
import {
  useAddToBasketMutation,
  useGetCartQuery,
  useUpdateBasketMutation,
} from "@/redux/api/product";
import { useGetClothesByIdQuery } from "@/redux/api/category";
import { useParams, useRouter } from "next/navigation";
import ColorsClothes from "../../ui/colors/Colors";
import React, { FC, useState, useEffect } from "react";
import Sizes from "./sizes/Sizes";
import Review from "./Review/Review";
import { useForm, Controller } from "react-hook-form"; // Импортируем useForm и Controller

const sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];

const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

interface clothesImg {
  photo: string;
  id: number;
  color: string;
}

interface FormValues {
  color_id: number;
  size: string;
}

const SinglePageSection: FC = () => {
  const id = useParams();
  const { data: cart } = useGetCartQuery() as any;
  const { data } = useGetClothesByIdQuery(Number(id.single));
  const [selectedPhoto, setSelectedPhoto] = useState<string | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [count, setCounter] = useState<number>(1);
  const [addBasketMutation] = useAddToBasketMutation();
  const [updateBasketMutation] = useUpdateBasketMutation();
  const router = useRouter();

  // Инициализация react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue: setFormValue,
  } = useForm<FormValues>({
    defaultValues: {
      color_id: 0,
      size: "",
    },
  });
  console.log("🚀 ~ errors:", errors)

  useEffect(() => {
    if (data?.clothes_img?.length) {
      setSelectedPhoto(data.clothes_img[0].photo);
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

  const onSubmit = async (formData: FormValues) => {
    if (!formData.color_id || !formData.size) {
      return; // Валидация уже обрабатывается react-hook-form
    }

    try {
      const sameItem = cart?.[0]?.cart_items?.find(
        (item: cart) =>
          item.clothes.clothes_name === data.clothes_name &&
          item.color === formData.color_id
      );

      if (sameItem) {
        await updateBasketMutation({
          id: sameItem.id,
          updateBasket: {
            quantity: sameItem.quantity + count,
          },
        });
      } else {
        await addBasketMutation({
          clothes_id: data.id,
          color_id: formData.color_id,
          size: formData.size,
          quantity: count,
          clothes: {
            clothes_name: ""
          },
          color: {
            color: ""
          }
        });
      }

      router.push("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
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
              {clothes_img?.map((el: clothesImg, index: number) => (
                <div
                  key={index}
                  className={`${scss.thumbnail} ${
                    el.photo === selectedPhoto ? scss.activeThumbnail : ""
                  }`}
                  onClick={() => {
                    setFormValue("color_id", el.id); // Устанавливаем значение цвета в форму
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

          <form onSubmit={handleSubmit(onSubmit)} className={scss.info}>
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
              <h4>{Math.round(Number(discount_price))} сом</h4>
            </div>
            <div className={scss.colors}>
              <h5>Цвета:</h5>
              <ColorsClothes
                clothesImg={clothes_img}
                onClick={(item) => {
                  setFormValue("color_id", item.id!); // Устанавливаем значение цвета в форму
                  setSelectedPhoto(item.photo);
                }}
              />
              {errors.color_id && (
                <p className={scss.error} role="alert">Пожалуйста, выберите цвет</p>
              )}
            </div>
            <div className={scss.textile}>
              <h5>Ткань:</h5>
              <h4>
                {textile_clothes
                  .map((el: { textile_name: string }) =>
                    capitalize(el.textile_name)
                  )
                  .join(", ")}
              </h4>
            </div>
            <div className={scss.description}>
              <p>{clothes_description}</p>
            </div>
            <div className={scss.sizes}>
              <Sizes
                sizes={sizes}
                availableSizes={
                  Array.isArray(availableSizes)
                    ? availableSizes
                    : availableSizes?.split(",")
                }
                selectedSize={selectedSize}
                onClick={(size) => {
                  setFormValue("size", size); // Устанавливаем значение размера в форму
                  setSelectedSize(size);
                }}
              />
              {errors.size && (
                <p className={scss.error} role="alert">Пожалуйста, выберите размер</p>
              )}
            </div>
            <div className={scss.quantity}>
              <h3>Количество:</h3>
              <div className={scss.groupOfBtn}>
                <div className={scss.counter}>
                  <button onClick={decrementCount} disabled={count === 1}>
                    -
                  </button>
                  <span>{count}</span>
                  <button
                    onClick={incrementCount}
                    disabled={count >= data.quantities}
                    className={count >= data.quantities ? scss.disabledBtn : ""}
                  >
                    +
                  </button>
                </div>
                <button type="submit" className={scss.cart}>
                  В корзинку
                  <Image src={bagSvg} alt="bag" width={24} height={24} />
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className={scss.review}>
          <Review />
        </div>
      </div>
    </section>
  );
};

export default SinglePageSection;
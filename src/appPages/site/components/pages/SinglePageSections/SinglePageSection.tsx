"use client";

import star from "@/assets/images/star.png";
import backIcon from "@/assets/icons/backIcon.svg";
import bagSvg from "@/assets/icons/bag-happy.svg";
import Image from "next/image";
import Link from "next/link";
import scss from "./SinglePageSection.module.scss";
import { useAddToBasketMutation, useGetCartQuery } from "@/redux/api/product";
import { useGetClothesByIdQuery } from "@/redux/api/category";
import { useParams, useRouter } from "next/navigation";
import ColorsClothes from "../../ui/colors/Colors";
import React, { FC, useState, useEffect } from "react";
import Sizes from "./sizes/Sizes";
import { ToastContainer, toast } from "react-toastify";

const sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];

const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const SinglePageSection: FC = () => {
  const id = useParams();
  const { data } = useGetClothesByIdQuery(Number(id.single));
  const { data: cart } = useGetCartQuery();
  console.log("🚀 ~ cart:", cart);

  const [selectedPhoto, setSelectedPhoto] = useState<string | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const [value, setValue] = useState<post_cart_item>({
    clothes: { clothes_name: "" },
    clothes_id: 0,
    quantity: 1,
    size: "",
    color: { color: "" },
    color_id: 0,
  });
  const [basket, setBasket] = useState<post_cart_item[]>([]);
  const [count, setCounter] = useState<number>(1);
  const [addBasketMutation] = useAddToBasketMutation();
  const router = useRouter();

  useEffect(() => {
    if (data?.clothes_img?.length) setSelectedPhoto(data.clothes_img[0].photo);
    if (data?.id) setValue((prev) => ({ ...prev, clothes_id: data.id }));
  }, [data]);

  const updateValue = (key: keyof post_cart_item, newValue: any) => {
    setValue((prev) => ({ ...prev, [key]: newValue }));
  };

  const handleAddToBasket = async () => {
    if (!value.size || !value.color_id || !value.clothes_id) {
      toast.warning("Выберите размер и цвет товара!");
      return;
    }

    const cartItems = cart?.cart_items || [];
    const isAlreadyInBasket = cartItems.some(
      (item) => item.size === value.size && item.color === value.color_id
    );

    if (isAlreadyInBasket) {
      toast.warning("Этот товар уже добавлен в корзину!");
      return;
    }
    const payload = { ...value, quantity: count };

    try {
      const result = await addBasketMutation(payload).unwrap();
      toast.success("Товар успешно добавлен в корзину!");
      router.push("/cart");
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

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
    quantities,
  } = data;

  return (
    <section className={scss.SinglePageSection}>
      <ToastContainer />
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
                    updateValue("color", { color: el.color });
                    updateValue("color_id", el.id);
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
                onClick={(item) => {
                  updateValue("color", { color: item.color });
                  updateValue("color_id", item.id);
                }}
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
              <p>
                {isExpanded
                  ? clothes_description
                  : clothes_description.slice(0, 550)}
                <span onClick={() => setIsExpanded((prev) => !prev)}>
                  {isExpanded ? "Свернуть" : "Ещё"}
                </span>
              </p>
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
                  <button onClick={() => setCounter((c) => Math.max(1, c - 1))}>
                    -
                  </button>
                  <span>{count}</span>
                  <button
                    onClick={() =>
                      setCounter((c) => Math.min(quantities, c + 1))
                    }
                    disabled={count >= quantities}
                  >
                    +
                  </button>
                </div>
                <div className={scss.cart} onClick={handleAddToBasket}>
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

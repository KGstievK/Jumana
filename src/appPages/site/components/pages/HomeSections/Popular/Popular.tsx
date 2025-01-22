"use client";
import Image from "next/image";
import scss from "./Popular.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";

import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

import star from "@/assets/icons/Star.svg";
import favorite from "@/assets/icons/Favorite.svg";
import cart from "@/assets/icons/cartProduct.svg";
import arrow from "@/assets/icons/arrow.svg";
import { useGetAllClothesQuery } from "@/redux/api/category";

const Popular = () => {
  const { data } = useGetAllClothesQuery();
  const newArrivals = data?.filter((item) =>
    item.promo_category.some(
      (category) => category.promo_category.toLowerCase() === "популярные"
    )
  );

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
          <>
            <Swiper
              slidesPerView={4}
              spaceBetween={100}
              autoplay={{
                delay: 2300,
                disableOnInteraction: false,
              }}
              breakpoints={{
                325: {
                  slidesPerView: 2,
                  spaceBetween: 5,
                },
                400: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 100,
                },
              }}
              modules={[Autoplay, Pagination, Navigation]}
              className={scss.mySwiper}
            >
              {newArrivals?.map((item) => (
                <SwiperSlide key={item.id} className={scss.mySwiper_slide}>
                  <div
                    className={scss.ProductNew}
                    style={{
                      background: `url(${item.clothes_img[0].photo})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "top",
                    }}
                  >
                    <p>
                      <Image src={star} alt="rating" /> {item.average_rating}
                    </p>
                    <button className="favorite">
                      <Image src={favorite} alt="favorite" />
                    </button>
                    <button className="cart">
                      <Image src={cart} alt="cart" />
                    </button>
                  </div>
                  <div className={scss.Product_info}>
                    {/* <p>{item.category}</p> */}
                    <h2>{item.clothes_name}</h2>
                    <div className={scss.price}>
                      <p>{item.price}</p>
                      <p>
                        <s>{item.discount_price}</s>
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
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

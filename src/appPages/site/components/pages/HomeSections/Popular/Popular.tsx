import Image from "next/image";
import scss from "./Popular.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";

import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

import popular1 from '@/assets/images/SwiperImages/PopularImage1.svg'
import popular2 from '@/assets/images/SwiperImages/PopularImage2.svg'
import popular3 from '@/assets/images/SwiperImages/PopularImage3.svg'
import popular4 from '@/assets/images/SwiperImages/PopularImage4.svg'
import popular5 from '@/assets/images/SwiperImages/PopularImage5.svg'
import popular6 from '@/assets/images/SwiperImages/PopularImage6.svg'
import popular7 from '@/assets/images/SwiperImages/PopularImage7.svg'

import star from "@/assets/icons/Star.svg";
import favorite from "@/assets/icons/Favorite.svg";
import cart from "@/assets/icons/cartProduct.svg";
import arrow from "@/assets/icons/arrow.svg";

const Popular = () => {
  const newArr = [
    {
      _id: 1,
      image: popular1.src,
      category: "Product Category",
      nameProduct: "JUMANA “22",
      price: "1200сом",
      discount: "1500сом",
      rating: "4.95",
    },
    {
      _id: 2,
      image: popular2.src,
      category: "Product Category",
      nameProduct: "JUMANA “22",
      price: "1200сом",
      discount: "1500сом",
      rating: "4.95",
    },
    {
      _id: 3,
      image: popular3.src,
      category: "Product Category",
      nameProduct: "JUMANA “22",
      price: "1200сом",
      discount: "1500сом",
      rating: "4.95",
    },
    {
      _id: 4,
      image: popular4.src,
      category: "Product Category",
      nameProduct: "JUMANA “22",
      price: "1200сом",
      discount: "1500сом",
      rating: "4.95",
    },
    {
      _id: 5,
      image: popular5.src,
      category: "Product Category",
      nameProduct: "JUMANA “22",
      price: "1200сом",
      discount: "1500сом",
      rating: "4.95",
    },
    {
      _id: 6,
      image: popular6.src,
      category: "Product Category",
      nameProduct: "JUMANA “22",
      price: "1200сом",
      discount: "1500сом",
      rating: "4.95",
    },
    {
      _id: 7,
      image: popular7.src,
      category: "Product Category",
      nameProduct: "JUMANA “22",
      price: "1200сом",
      discount: "1500сом",
      rating: "4.95",
    },
    {
      _id: 8,
      image: popular4.src,
      category: "Product Category",
      nameProduct: "JUMANA “22",
      price: "1200сом",
      discount: "1500сом",
      rating: "4.95",
    },
  ];

  return (
    <section className={scss.Popular}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.navigate_title}>
            <h1 className="title">Популярные товары</h1>
            <Link href="">
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
              {newArr.map((item) => (
                <SwiperSlide key={item._id} className={scss.mySwiper_slide}>
                  <div
                    className={scss.ProductNew}
                    style={{
                      background: `url(${item.image})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "top",
                    }}
                  >
                    <p>
                      {" "}
                      <Image src={star} alt="rating" /> {item.rating}
                    </p>
                    <button className="favorite">
                      <Image src={favorite} alt="favorite" />
                    </button>
                    <button className="cart">
                      <Image src={cart} alt="cart" />
                    </button>
                  </div>
                  <div className={scss.Product_info}>
                    <p>{item.category}</p>
                    <h2>{item.nameProduct}</h2>
                    <div className={scss.price}>
                      <p>{item.price}</p>
                      <p>
                        <s>{item.discount}</s>
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
          <div className={scss.navigate_mobile}>
            <Link href="">
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

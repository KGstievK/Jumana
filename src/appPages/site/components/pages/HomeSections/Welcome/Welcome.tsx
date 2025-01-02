import React, { useEffect, useState } from "react";
import scss from "./Welcome.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import Image from "next/image";
import arrow from "@/assets/icons/arrow.svg";
import img1 from "@/assets/images/SwiperImages/1.svg";
import img2 from "@/assets/images/SwiperImages/2.svg";
import img3 from "@/assets/images/SwiperImages/3.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Welcome = () => {
  const [tab, setTab] = useState(img1.src);
  const [visibleImages, setVisibleImages] = useState([1, 2]);
  const images = [
    { id: 1, image: img1.src },
    { id: 2, image: img2.src },
    { id: 3, image: img3.src },
  ];

  const handleImageClick = (clickedIndex: number) => {
    setTab(images[clickedIndex].image);
    setVisibleImages((prevVisible) => {
      const nextIndex = images.findIndex(
        (_, idx) => !prevVisible.includes(idx)
      );
      return prevVisible.map((idx) => (idx === clickedIndex ? nextIndex : idx));
    });
  };

  const navigate = useRouter();
  return (
    <section className={scss.Welcome}>
      <div className="container">
        <div className={scss.content}>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            className={scss.Swiper}
          >
            <SwiperSlide className={scss.SwiperSlide}>
              <div className={scss.Swiper_Title}>
                <h4>made in KYrgyzstan</h4>
                <h1>Скромность, воплощённая в элегантности</h1>
                <button onClick={() => navigate.push("/catalog")}>
                  Каталог
                  <Image src={arrow} alt="Valid src" />
                </button>
              </div>
              <div className={scss.Swiper_Image}>
                <div className={scss.Swiper_Image_tab}>
                  <Image
                    className={scss.image_wrapper}
                    src={tab}
                    alt="tab"
                    width={420}
                    height={630}
                  />
                  <Link href="/single">
                    Купить <Image src={arrow} alt="Valid src" />
                  </Link>
                </div>
                {visibleImages.map((visibleIndex) => (
                  <Image
                    key={images[visibleIndex].id}
                    src={images[visibleIndex].image}
                    alt={`Slide ${visibleIndex}`}
                    width={156}
                    height={234}
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => handleImageClick(visibleIndex)}
                  />
                ))}
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Welcome;

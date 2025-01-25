import React, { useEffect, useState } from "react";
import scss from "./Welcome.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import Image from "next/image";
import arrow from "@/assets/icons/arrow.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGetFirstSectionQuery } from "@/redux/api/category";

const Welcome = () => {
  const router = useRouter();
  const { data } = useGetFirstSectionQuery();
  const [tab, setTab] = useState<string | null>(null);
  const [visibleImages, setVisibleImages] = useState([1, 2]);

  useEffect(() => {
    if (data?.[0]?.img1) {
      setTab(data[0].img1);
    }
  }, [data]);

  if (!data?.[0] || !tab) return null;

  const images = [
    { id: 1, image: data[0]?.img1 },
    { id: 2, image: data[0]?.img2 },
    { id: 3, image: data[0]?.img3 },
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
                <h4>{data[0].made}</h4>
                <h1>{data[0].title}</h1>
                <button onClick={() => router.push("/catalog")}>
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
                  <Link href="/catalog">
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
                    style={{ cursor: "pointer" }}
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

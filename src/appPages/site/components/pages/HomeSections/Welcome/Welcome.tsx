import React from "react";
import scss from "./Welcome.module.scss";
import {Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

const Welcome = () => {
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
          >
            <SwiperSlide>
              <div className={scss.Swiper_Title}>
                <h1>
                Скромность, воплощённая 
                в элегантности
                </h1>
                <button>
                Каталог
                <img src="" alt="" />
                </button>
              </div>
            </SwiperSlide>
          </Swiper>
          <h1>Welcome</h1>
        </div>
      </div>
    </section>
  );
};

export default Welcome;

"use client";
import Image from "next/image";
import scss from "./AboutUsSection.module.scss";
import New from "../HomeSections/New/New";
import { useGetAboutUsQuery } from "@/redux/api/product";

interface IAbout {
  img: string;
  title: string;
  text: string;
}

const AboutUsSection = () => {
  const { data } = useGetAboutUsQuery();
  return (
    <section className={scss.AboutComponent}>
      {data?.map((el, index) => (
        <div key={index}>
          <section className={scss.AboutUsSection}>
            <div className="container">
              <div className={scss.content}>
                <div className={scss.first}>
                  <Image
                    width={120}
                    height={100}
                    src={el.logo || "logotype"}
                    alt="logo"
                  />
                  <p>{el.made}</p>
                  <h1>{el.title}</h1>
                </div>
              </div>
            </div>
          </section>
          {el.about_me.map((item: IAbout, idx: number) => (
            <div key={idx}>
              {idx % 2 === 0 ? (
                <section className={scss.secondSection}>
                  <div className="container">
                    <div className={scss.content}>
                      <div className={scss.second}>
                        <img src={item.img} alt="img1" />
                        <div className={scss.title}>
                          <h1>{item.title}</h1>
                          <p>{item.text}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              ) : (
                <section className={scss.AboutUsSection}>
                  <div className="container">
                    <div className={scss.content}>
                      <div className={scss.thirst}>
                        <div className={scss.title}>
                          <h1>{item.title}</h1>
                          <p>{item.text}</p>
                        </div>
                        <img src={item.img} alt="img2" />
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>
          ))}
        </div>
      ))}
      <New />
    </section>
  );
};

export default AboutUsSection;

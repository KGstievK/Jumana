"use client";
import Image from "next/image";
import scss from "./AboutUsSection.module.scss";
import logo from "@/assets/icons/logo.svg";
import img1 from "@/assets/images/aboutImg1.svg";
import img2 from "@/assets/images/AboutImg2.svg";
import img3 from "@/assets/images/AboutImg3.svg";
import New from "../HomeSections/New/New";
import { useGetAboutUsQuery } from "@/redux/api/product";

const AboutUsSection = () => {
  const { data } = useGetAboutUsQuery();
  console.log("🚀 ~ AboutUsSection ~ data:", data);
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
          {el.about_me.map((item, idx) => (
            <div key={idx}>
              {idx % 2 === 0 ? (
                <section className={scss.secondSection}>
                  <div className="container">
                    <div className={scss.content}>
                      <div className={scss.second}>
                        <Image
                          width={400}
                          height={500}
                          src={item.img}
                          alt="img1"
                        />
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
                        <Image
                          width={400}
                          height={500}
                          src={item.img}
                          alt="img2"
                        />
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

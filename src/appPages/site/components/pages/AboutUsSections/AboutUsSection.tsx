import Image from "next/image";
import scss from "./AboutUsSection.module.scss";
import logo from "@/assets/icons/logo.svg";
import img1 from "@/assets/images/aboutImg1.svg";
import img2 from "@/assets/images/AboutImg2.svg";
import img3 from "@/assets/images/AboutImg3.svg";
import New from "../HomeSections/New/New";

const AboutUsSection = () => {
  return (
    <section className={scss.AboutComponent}>
      <section className={scss.AboutUsSection}>
        <div className="container">
          <div className={scss.content}>
            <div className={scss.first}>
              <Image src={logo} alt="logo" />
              <p>MADE IN KYRGYZSTAN</p>
              <h1>Мы олицетворяем элегантность и скромность</h1>
            </div>
          </div>
        </div>
      </section>
      <section className={scss.secondSection}>
        <div className="container">
          <div className={scss.content}>
            <div className={scss.second}>
              <Image src={img1} alt="img1" />
              <div className={scss.title}>
                <h1>О бренде</h1>
                <p>
                  Мы — интернет-магазин, который создаёт одежду для
                  мусульманских женщин, объединяя традиции с современными
                  модными тенденциями. Наша цель — предложить вам комфортную,
                  стильную и качественную одежду, которая подчеркнёт вашу
                  индивидуальность, сохраняя скромность.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={scss.AboutUsSection}>
        <div className="container">
          <div className={scss.content}>
            <div className={scss.thirst}>
              <div className={scss.title}>
                <h1>Наша миссия:</h1>
                <p>
                  Мы верим, что одежда — это не просто вещи. Это отражение вашей
                  личности, гармонии и ценностей. Наши коллекции созданы с
                  уважением к культуре и заботой о вашем комфорте.
                </p>
              </div>
              <Image src={img2} alt="img2" />
            </div>
          </div>
        </div>
      </section>
      <section className={scss.AboutUsSection}>
        <div className="container">
          <div className={scss.content}>
            <div className={scss.fourth}>
              <Image src={img3} alt="img3" />
              <div className={scss.title}>
                <h1> Наши ценности:</h1>
                <p>
                  Это гармония традиций, качество и забота о каждой женщине,
                  подчеркивающая её индивидуальность и стиль.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <New/>
    </section>
  );
};

export default AboutUsSection;

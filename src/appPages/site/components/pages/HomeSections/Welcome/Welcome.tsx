"use client";
import Image from "next/image";
import scss from "./Welcome.module.scss";
import arrow from "@/assets/icons/Icon.svg";
import mainImg from "@/assets/images/heroFistFoto.png";
import img2 from "@/assets/images/heroSecondFoto.png";
import img3 from "@/assets/images/heroThirdFoto.png";
import { useRouter } from "next/navigation";

const Welcome = () => {
  const router = useRouter();
  return (
    <section className={scss.Welcome}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.textBlock}>
            <h6>made in Kyrgyzstan</h6>
            <h1>Скромность, воплощённая в элегантности</h1>
            <div className={scss.cart} onClick={() => router.push("/catalog")}>
              <button>Каталог</button>
              <Image src={arrow} alt="bag" width={24} height={24} />
            </div>
          </div>
          <div className={scss.imageBlock}>
            <div className={scss.image}>
              <div className={scss.cartBtn}>
                <button>Купить</button>
                <Image src={arrow} alt="photo" width={24} height={24} />
              </div>
              <div className={scss.mainImg}>
                <Image src={mainImg} alt="photo" />
                <div className={scss.overlay}></div>
              </div>
            </div>
            <div className={scss.images}>
              <Image src={img2} alt="photo" className={scss.foto} />
              <Image src={img3} alt="photo" className={scss.foto2} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;

import Image from "next/image";
import scss from "./SinglePageSection.module.scss";
import img from "@/assets/images/cardImage.png";
import star from "@/assets//images//star.png";
import Link from "next/link";

//! Это Карточка товаров

const SinglePageSection = () => {
  return (
    <section className={scss.SinglePageSection}>
      <div className="container">
        <div className={scss.header}>
          <Link href="/">Главная</Link>/<Link href="category">Категории</Link>/
          <Link href="/">Платья</Link>/ <Link href="">JUMANA “24</Link>
        </div>
        <div className={scss.content}>
          <div className={scss.images}>
            <Image src={img} alt="photo" />
            <div className={scss.image}>
              <Image src={img} alt="photo" />
              <Image src={img} alt="photo" />
              <Image src={img} alt="photo" />
            </div>
          </div>

          <div className={scss.info}>
            <div className={scss.headLine}>
              <h3>Product Category</h3>
              <div className={scss.mark}>
                <Image src={star} alt="star" width={24} height={24} />
                <h6>4.95</h6>
              </div>
            </div>
            <h1>JUMANA “24</h1>

            <div className={scss.price}>
              <del>2700 сом</del>
              <h4>1400 сом</h4>
            </div>

            <div className={scss.colors}>
              <h5>Цвета: </h5>
            </div>
            <div className={scss.textile}>
              <h5>Ткань:</h5>
              <h4>Таффета</h4>
            </div>
            <div className={scss.description}>
              <p>
                Красивые платья оптом от производителя из Бишкека ,
                КыргызстанКрасивые платья оптом от производителя из Бишкека ,
                Кыргызстан
              </p>
            </div>

            <div className={scss.sizes}>
              <h5>Размеры:</h5>
              <span>XXS</span>
              <span>XS</span>
              <span>S</span>
              <span>M</span>
              <span>L</span>
              <span>XL</span>
              <span>XXL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SinglePageSection;

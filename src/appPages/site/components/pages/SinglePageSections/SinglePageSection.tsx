"use client";
import star from "@/assets//images//star.png";
import backIcon from "@/assets/icons/backIcon.svg";
import bagSvg from "@/assets/icons/bag-happy.svg";
import Image from "next/image";
import Link from "next/link";
import scss from "./SinglePageSection.module.scss";
import { useAddToBasketMutation } from "@/redux/api/product";
import { useGetClothesByIdQuery } from "@/redux/api/category";
import { useParams } from "next/navigation";

//! Это Карточка товаров
// interface SinglePageSectionProps {
//   data: SingleProductData;
// }

const SinglePageSection = () => {
  const id = useParams();
  console.log("🚀 ~ id1234567890:", id.single);

  const { data } = useGetClothesByIdQuery(Number(id.single));

  const [addBasketMutation] = useAddToBasketMutation();

  if (!data) {
    return <div>Загрузка данных подождите...</div>;
  }

  return (
    <section className={scss.SinglePageSection}>
      <div className="container">
        <div className={scss.header}>
          <Image src={backIcon} alt="icon " width={22} height={22} />
          <Link href="/">Главная</Link>/<Link href="category">Категории</Link>/
          <Link href="/">Платья</Link>/ <Link href="">JUMANA “24</Link>
        </div>

        <div className={scss.content}>
          <div className={scss.images}>
            <Image
              src={data.clothes_photo}
              alt="photo"
              width={505}
              height={550}
            />
            {/* {data.color.map((el, idx) => (
              <div key={idx} className={scss.image}>
                {el?.color_photo.map((title, index) =>
                  title ? (
                    <Image key={index} src={title.photo} alt="photo" />
                  ) : null
                )}
              </div>
            ))} */}
          </div>

          <div className={scss.info}>
            <div className={scss.headLine}>
              <h3>Product Category</h3>
              <div className={scss.mark}>
                <Image src={star} alt="star" width={24} height={24} />
                <h6> {data?.average_rating}</h6>
              </div>
            </div>
            <h1>{data?.clothes_name}</h1>

            <div className={scss.price}>
              <h4>{data?.price}</h4>
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
                Красивые платья оптом от производителя из Бишкека , Кыргызстан
                Красивые платья оптом от производителя из Бишкека , Кыргызстан
                Красивые платья оптом от производителя из Бишкека , Кыргызстан
              </p>
            </div>

            <div className={scss.sizes}>
              <h5>Размеры:</h5>
              <div className={scss.spans}>
                {data?.size.map((el, index) => (
                  <span key={index}>{el}</span>
                ))}
              </div>
            </div>

            <div className={scss.quantity}>
              <h3>Количество:</h3>
              <div className={scss.groupOfBtn}>
                <div className={scss.counter}>
                  <button>-</button>
                  <span>1</span>
                  <button>+</button>
                </div>
                <div className={scss.cart}>
                  <button
                  // onClick={() => {
                  // route.push("/cart");
                  //   addBasketMutation(data);
                  // }}
                  >
                    В корзинку
                  </button>
                  <Image src={bagSvg} alt="bag" width={24} height={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SinglePageSection;

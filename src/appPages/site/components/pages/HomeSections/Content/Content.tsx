import Image from "next/image";
import scss from "./Content.module.scss";
import arrow from "@/assets/icons/arrow.svg";


const Content = () => {
  return (
    <section className={scss.Content}>
      <div className={scss.content}>
        <h1>
          Мы создаём одежду, которая объединяет традиции и современный стиль. В
          каждой детали — качество, комфорт и забота о вас. Наши коллекции
          вдохновляют и подчёркивают вашу индивидуальность.
        </h1>
        <p>С любовью, Jumana</p>
        <button>
          Подробнее <Image src={arrow} alt="arrow" />
        </button>
      </div>
    </section>
  );
};

export default Content;

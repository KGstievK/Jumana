import Image from "next/image";
import scss from "./Sale.module.scss";
import Link from "next/link";

import sale from "@/assets/images/image.svg";
import arrow from "@/assets/icons/arrowBlack.svg";
import { useGetSaleContentQuery } from "@/redux/api/category";

const Sale = () => {
  const { data } = useGetSaleContentQuery();
  return (
    <section className={scss.Sale}>
      {data?.map((item) => (
        <div className={scss.content}>
          <div className={scss.SaleLeft}>
            <Image src={item.img} alt="Sale" />
          </div>
          <div className={scss.SaleRight}>
            <h1 className="title">{item.title}</h1>
            <p>{item.text}</p>
            <Link href="/sale">
              Подробнее <Image src={arrow} alt="arrow" />
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Sale;

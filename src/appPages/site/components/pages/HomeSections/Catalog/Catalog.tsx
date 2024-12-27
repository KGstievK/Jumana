import Link from "next/link";
import scss from "./Catalog.module.scss";
import Image from "next/image";
import arrow from "@/assets/icons/arrow.svg";
import { useNavigate } from "react-router-dom";

const Catalog = () => {

  const navigate = useNavigate()
  return (
    <section className={scss.Catalog}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.navigate_title}>
            <h1 className="title">Каталог</h1>
            <Link href="catalog">
              <button>
                Посмотреть все <Image src={arrow} alt="arrow" />
              </button>
            </Link>
          </div>
          <div className={scss.catalogBlocks}>
            <div className={scss.catalogLeft}>
              <div className={scss.Dresses} onClick={() => navigate('/catalog')}>
                <h1>Платья</h1>
              </div>
              <div className={scss.Hijabs} onClick={() => navigate('/catalog')}>
                <h1>Хиджабы</h1>
              </div>
            </div>
            <div className={scss.catalogRight} onClick={() => navigate('/catalog')}>
              <h1>Туники</h1>
            </div>
          </div>
          <div className={scss.navigate_mobile}>
            <Link href="/catalog">
              <button>
              Каталог <Image src={arrow} alt="arrow" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Catalog;

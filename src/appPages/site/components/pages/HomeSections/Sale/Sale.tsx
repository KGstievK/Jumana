import Image from 'next/image'
import scss from './Sale.module.scss'
import Link from 'next/link';

import sale from "@/assets/images/image.svg";
import arrow from "@/assets/icons/arrowBlack.svg"

const Sale = () => {
  return (
    <section className={scss.Sale}>
        <div className={scss.content}>
          <div className={scss.SaleLeft}>
            <Image src={sale} alt='Sale'/>
          </div>
          <div className={scss.SaleRight}>
            <h1 className='title'>Скидки до 50%!</h1>
            <p>
            Не упустите шанс! Выберите стильные модели по выгодным ценам. Акция действует ограниченное время.
            </p>
            <Link href=''>Подробнее <Image src={arrow} alt="arrow" /></Link>
          </div>
        </div>
    </section>
  )
}

export default Sale
'use client'
import star from '@/assets//images//star.png'
import backIcon from '@/assets/icons/backIcon.svg'
import bagSvg from '@/assets/icons/bag-happy.svg'
import img from '@/assets/images/cardImage.png'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import scss from './SinglePageSection.module.scss'

//! Это Карточка товаров
interface SinglePageSectionProps {
	data: SingleProductData
}

const SinglePageSection = ({ data }: SinglePageSectionProps) => {
	const route = useRouter()
	// console.log('🚀 ~ SinglePageSection ~ data:', data)

	return (
		<section className={scss.SinglePageSection}>
			<div className='container'>
				<div className={scss.header}>
					<Image src={backIcon} alt='icon ' width={22} height={22} />
					<Link href='/'>Главная</Link>/<Link href='category'>Категории</Link>/
					<Link href='/'>Платья</Link>/ <Link href=''>JUMANA “24</Link>
				</div>

				<div className={scss.content}>
					<div className={scss.images}>
						<Image src={img} alt='photo' />
						<div className={scss.image}>
							<Image src={img} alt='photo' />
							<Image src={img} alt='photo' />
							<Image src={img} alt='photo' />
						</div>
					</div>

					<div className={scss.info}>
						<div className={scss.headLine}>
							<h3>Product Category</h3>
							<div className={scss.mark}>
								<Image src={star} alt='star' width={24} height={24} />
								<h6> {data?.average_rating}</h6>
							</div>
						</div>
						<h1>{data?.clothes_name}</h1>

						<div className={scss.price}>
							{/* <del>{data.price}сом</del> */}
							{/* <h4>{data.price - (data.price * data.sale) / 100}сом</h4> */}
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
							</p>
						</div>

						<div className={scss.sizes}>
							<h5>Размеры:</h5>
							<div className={scss.spans}>
								<span>XXS</span>
								<span>XS</span>
								<span>S</span>
								<span>M</span>
								<span>L</span>
								<span>XL</span>
								<span>XXL</span>
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
									<button onClick={() => route.push('/cart')}>
										В корзинку
									</button>
									<Image src={bagSvg} alt='bag' width={24} height={24} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default SinglePageSection

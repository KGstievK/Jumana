'use client'
import backIcon from '@/assets/icons/backIcon.svg'
import Image from 'next/image'
import Link from 'next/link'
import Cards from './cards/Cards'
import scss from './CatalogSection.module.scss'
import SideBar from './sideBar/SideBar'

const CatalogSection = () => {
	// const { data } = useGetAllCategoryQuery();
	// console.log("🚀 ~ Cards ~ data:", data);

	return (
		<section className={scss.CatalogSection}>
			<div className='container'>
				<div className={scss.header}>
					<Image src={backIcon} alt='icon ' width={22} height={22} />
					<Link href='/'>Главная</Link>/<Link href='category'>Категории</Link>
				</div>
				<div className={scss.content}>
					<SideBar />
					<Cards />
				</div>
			</div>
		</section>
	)
}

export default CatalogSection

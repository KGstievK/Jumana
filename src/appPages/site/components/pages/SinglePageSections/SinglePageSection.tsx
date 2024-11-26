import scss from './SinglePageSection.module.scss'

//! Это Карточка товаров

const SinglePageSection = () => {
  return (
    <section className={scss.SinglePageSection}>
      <div className="container">
        <div className={scss.content}>
          <h1>SinglePageSection</h1>
        </div>
      </div>
    </section>
  )
}

export default SinglePageSection
import scss from './CatrSection.module.scss'

//! Это Корзина

const CatrSection = () => {
  return (
    <section className={scss.CatrSection}>
      <div className="container">
        <div className={scss.content}>
          <h1>CatrSection</h1>
        </div>
      </div>
    </section>
  )
}

export default CatrSection
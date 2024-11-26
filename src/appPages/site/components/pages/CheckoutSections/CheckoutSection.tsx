import scss from './CheckoutSection.module.scss'

//! Это Оформление Заказа

const CheckoutSection = () => {
  return (
    <section className={scss.CheckoutSection}>
      <div className="container">
        <div className={scss.content}>
          <h1>CheckoutSection</h1>
        </div>
      </div>
    </section>
  )
}

export default CheckoutSection
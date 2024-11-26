import scss from './FavoritSection.module.scss'

const FavoritSection = () => {
  return (
    <section className={scss.FavoritSection}>
      <div className="container">
        <div className={scss.content}>
          <h1>FavoritSection</h1>
        </div>
      </div>
    </section>
  )
}

export default FavoritSection
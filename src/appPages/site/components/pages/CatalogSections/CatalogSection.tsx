import scss from './CatalogSection.module.scss'

const CatalogSection = () => {
  return (
    <section className={scss.CatalogSection}>
      <div className="container">
        <div className={scss.content}>
          <h1>CatalogSection</h1>
        </div>
      </div>
    </section>
  )
}

export default CatalogSection
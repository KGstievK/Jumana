import scss from './Header.module.scss'
const Header = () => {
  return (
    <header className={scss.Header}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.Logo}>
            <h1>Logo</h1>
          </div>
          <div className={scss.nav}>
            <h1>Nav</h1>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
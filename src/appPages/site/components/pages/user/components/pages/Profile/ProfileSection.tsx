import scss from './ProfileSection.module.scss'

const ProfileSection = () => {
  return (
    <section className={scss.ProfileSection}>
        <div className={scss.content}>
          <h1>Личные данные</h1>
          <p>Подтвердите свою личность</p>
          <form>
            <p>Имя и Фамилия</p>
            <input type="text" placeholder='Айгерим' />  
            <p>Номер телефона</p>
            <input type="text" placeholder='+12345678910' />  
            <p>Адресс</p>
            <input type="text" placeholder='HubSpot, 25 First Street, Cambridge MA 02141, United States' />  
            <p>Email</p>
            <input type="text" placeholder='smith1996@gmail.com' />  
            <p>Пароль</p>
            <input type="text" placeholder='*********' />  
            <button className={scss.submit}>Сохранить</button>
          </form>
        </div>
    </section>
  )
}

export default ProfileSection
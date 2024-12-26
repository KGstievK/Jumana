import scss from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={scss.Footer}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.footerTop}>
            <div className={scss.blockLeft}>
              <p>
                <span>WhatsApp :</span> +996700987654
              </p>
              <p>
                <span>Email :</span> hello@modestwear.com
              </p>
              <p>
                <span>Address :</span> Lorem ipsum street Block B Number 08,
                Bishkek, Kyrgyzstan, 12345
              </p>
            </div>
            <div className={scss.blockRight}>
              <div className={scss.box}>
                <h3>Меню</h3>
                <ul>
                  <li>Главная</li>
                  <li>Новинки</li>
                  <li>Категории</li>
                  <li>О нас</li>
                  <li>Контакты</li>
                </ul>
              </div>

              <div className={scss.box}>
                <h3>Обратиться за помощью</h3>
                <ul>
                  <li>Доставка</li>
                  <li>Оплата</li>
                  <li>Частые вопросы</li>
                  <li>Политика конфиденциальности</li>
                </ul>
              </div>
            </div>
          </div>
          <div className={scss.footerBottom}>
            <p>All rights reserved</p>
            <p>Copyright 2024 By Jumana Fashion</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

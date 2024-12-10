import { useGetMeQuery } from "@/redux/api/auth";
import scss from "./ProfileSection.module.scss";
import { FC } from "react";
import { useAppProps } from "antd/es/app/context";


const ProfileSection = () => {
  // const { data } = useGetMeQuery();

  return (
    <section className={scss.ProfileSection}>
      <div className={scss.content}>
        <h1>Личные данные</h1>
        <p>Подтвердите свою личность</p>
        <form>
          <p>Имя и Фамилия</p>
          <input type="text" placeholder="Айгерим" 
          // value={data?.profile.userName} 
          />
          <p>Номер телефона</p>
          <input type="text" placeholder="+12345678910" 
          // value={data?.profile.phone}
          />
          <p>Адресс</p>
          <input
            type="text"
            placeholder="HubSpot, 25 First Street, Cambridge MA 02141, United States"
            // value={data?.profile.addres}
          />
          <p>Email</p>
          <input type="text" placeholder="smith1996@gmail.com" 
          // value={data?.profile.email}
          />
          <button className={scss.submit}>Сохранить</button>
        </form>
      </div>
    </section>
  );
};

export default ProfileSection;

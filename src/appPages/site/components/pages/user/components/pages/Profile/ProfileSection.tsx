"use client";
// import { useGetMeQuery } from "@/redux/api/auth";
import scss from "./ProfileSection.module.scss";
import { FC } from "react";
// import { useAppProps } from "antd/es/app/context";
// import { data } from "react-router-dom";
import { useSession } from "next-auth/react";
import Image from "next/image";

const ProfileSection: FC = () => {
  // const { data, isLoading, error } = useGetMeQuery();
  const { data: session } = useSession();
  // console.log("🚀 ~ useSession:", useSession())

  // console.log(session);
  
  

  // if (isLoading) {
  //   return <p>Загрузка данных...</p>;
  // }

  // console.log(data);

  // if (error) {
  //   return <p>Произошла ошибка при загрузке данных.</p>;
  // }

  return (
    <section className={scss.ProfileSection}>
      <div className={scss.content}>
        <h1>Личные данные</h1>
        <p>Подтвердите свою личность</p>
        <Image src={session?.user?.image} alt="avatar" width={70} height={70} />
        <form>
          <p>Имя и Фамилия</p>
          
          <input
            type="text"
            placeholder={session?.user?.name}
            // value={session?.user?.name}
          />
          {/* <p>{data?.username}</p> */}
          <p>Номер телефона</p>
          <input
            type="text"
            placeholder="+12345678910"
            // value={data?.profile.phone}
          />
          <p>Адресс</p>
          <input
            type="text"
            placeholder="HubSpot, 25 First Street, Cambridge MA 02141, United States"
            // value={data?.profile.addres}
          />
          <p>Email</p>
          <input
            type="text"
            placeholder={session?.user?.email}
            // value={data?.profile.email}
          />
          <button className={scss.submit}>Сохранить</button>
        </form>
      </div>
    </section>
  );
};

export default ProfileSection;

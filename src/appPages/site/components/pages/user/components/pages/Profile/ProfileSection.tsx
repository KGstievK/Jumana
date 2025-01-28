"use client";
import scss from "./ProfileSection.module.scss";
import { FC, useState } from "react";
import { useGetMeQuery, usePutMeMutation } from "@/redux/api/auth";
import { SubmitHandler, useForm } from "react-hook-form";

const ProfileSection: FC = () => {
  const [tab, setTab] = useState(false);
  const { data: response } = useGetMeQuery();
  const [putMe] = usePutMeMutation();

  const { register, handleSubmit } = useForm<AUTH.PutMeRequest>();

  const onSubmit: SubmitHandler<AUTH.PutMeRequest> = async (userData) => {
    if (!response?.map((el) => el.id)) {
      console.error("User data not available");
      return;
    }

    const dataUser = {
      id: response[0].id,
      username: userData.username,
      email: userData.email,
      first_name: userData.first_name,
      last_name: userData.last_name,
      address: userData.address,
      number: userData.number,
    };
    console.log("🚀 ~ constonSubmit:SubmitHandler<AUTH.PutMeRequest>= ~ dataUser:", dataUser)
    console.log("🚀 ~ constonSubmit:SubmitHandler<AUTH.PutMeRequest>= ~ dataUser.response[0].id:", response.map((el) => el))

    try {
      const { data: userId } = await putMe(dataUser);
      console.log(userId);
      window.location.reload();
    } catch (e) {
      console.error("An error occurred:", e);
    }
  };

  if (!tab) {
    return (
      <section className={scss.ProfileSection}>
        <div className="container">
          <div className={scss.content}>
            <h1>Личные данные</h1>
            <p>Подтвердите свою личность</p>

            {response?.map((el, idx) => (
              <form key={idx}>
                <p>Имя и Фамилия</p>
                <div className={scss.firstName_and_LastName}>
                  <h2>{el.first_name}</h2>
                  <h2>{el.last_name}</h2>
                </div>
                <p>E-mail адрес</p>
                <h2>{el.username}</h2>
                <p>E-mail адрес</p>
                <h2>{el.email}</h2>
                <p>Номер телефона</p>
                <h2>{el.number}</h2>
                <p>Адресс</p>
                <h2>{el.address}</h2>
                <button className={scss.submit} onClick={() => setTab(!tab)}>
                  Редактировать
                </button>
              </form>
            ))}
          </div>
        </div>
      </section>
    );
  }
  if (tab) {
    return (
      <section className={scss.ProfileSection}>
        <div className="container">
          <div className={scss.content}>
            <h1>Личные данные</h1>
            <p>Подтвердите свою личность</p>

            {response?.map((el, idx) => (
              <form key={idx} onSubmit={handleSubmit(onSubmit)}>
                <p>Имя и Фамилия</p>
                <div className={scss.firstName_and_LastName}>
                  <input
                    type="text"
                    placeholder={`${
                      el.first_name! ? el.first_name : "Александр"
                    }`}
                    {...register("first_name", { required: true })}
                  />
                  <input
                    type="text"
                    placeholder={`${el.last_name! ? el.last_name : "Петрович"}`}
                    {...register("last_name", { required: true })}
                  />
                </div>
                <p>User Name</p>
                <input
                  type="text"
                  placeholder={"Ваш никнейм"}
                  {...register("username", { required: true })}
                />
                <p>E-mail адрес</p>
                <input
                  type="text"
                  placeholder={el.email! ? el.email : "user@example.com"}
                  {...register("email", { required: true })}
                />
                <p>Номер телефона</p>
                <input
                  type="text"
                  placeholder={el.number! ? el.number : "+996123456"}
                  {...register("number", { required: true })}
                />
                <p>Адресс</p>
                <input
                  type="text"
                  placeholder={
                    el.address!
                      ? el.address
                      : "HubSpot, 25 First Street, Cambridge MA 02141, United States"
                  }
                  {...register("address", { required: true })}
                />
                <button className={scss.submit} type="submit" //onClick={() => setTab(!tab)}
                >
                  Сохранить
                </button>
              </form>
            ))}
          </div>
        </div>
      </section>
    );
  }
};

export default ProfileSection;

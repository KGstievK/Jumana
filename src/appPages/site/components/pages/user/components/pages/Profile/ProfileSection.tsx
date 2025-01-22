"use client";
import scss from "./ProfileSection.module.scss";
import { FC, useState } from "react";
import { useGetMeQuery, usePutMeMutation } from "@/redux/api/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams, useSearchParams } from "next/navigation";
import { CheckboxChangeEvent } from "antd";

interface PutMeProps {
  id: number;
  username: string;
  first_name?: string;
  last_name?: string;
  address?: string;
  index_pochta?: string;
  number: string;
}

const ProfileSection: FC = () => {
  const { data: response } = useGetMeQuery();

  const [putMe] = usePutMeMutation();

  const { register, handleSubmit } = useForm<AUTH.PutMeRequest>();

  const onSubmit: SubmitHandler<PutMeProps> = async (userData) => {
    const dataUser = {
      id: response?.map((el) => el.id),
      username: userData.username,
      first_name: userData.first_name,
      last_name: userData.last_name,
      address: userData.address,
      index_pochta: userData.index_pochta,
      number: userData.number,
    };

    try {
      const { data: userId, error } = await putMe(dataUser);
      window.location.reload();
    } catch (e) {
      console.error("An error occurred:", e);
    }
  };

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
              />
              <p>User name</p>
              <input
                type="text"
                placeholder={`${el.username! ? el.username : "Ваш никнейм"}`}
                {...register("username", { required: true })}
              />
              <button className={scss.submit} type="submit">
                Сохранить
              </button>
            </form>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;

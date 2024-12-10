"use client";
import scss from "./SignUpPage.module.scss";
import { usePostRegistrationMutation } from "@/redux/api/auth";
import { ConfigProvider } from "antd";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Checkbox, { CheckboxChangeEvent } from "antd/es/checkbox";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/icons/logo.svg";
import google from "@/assets/icons/google.svg";

interface RegisterType {
  email: string;
  userName: string;
  photo: string;
  password: string;
  confirmPassword: string;
}

const SignUpPage = () => {
  const [postRegisterMutation] = usePostRegistrationMutation();

  const { register, watch, handleSubmit } = useForm<RegisterType>();

  const [rememberMe, setRememberMe] = useState(false);

  const onSubmit: SubmitHandler<RegisterType> = async (userData) => {
    const userDataRest = {
      userName: userData.userName,
      email: userData.email,
      password: userData.password,
      photo: userData.photo,
    };

    try {
      const response = await postRegisterMutation(userDataRest);
      if (response.data?.accessToken) {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem(
          "accessToken",
          JSON.stringify(response.data.accessToken)
        );
        // window.location.reload();
      }
    } catch (e) {
      console.error("An error occurred:", e);
    }
  };

  const handleRememberMeChange = (e: CheckboxChangeEvent) => {
    setRememberMe(e.target.checked);
  };

  const password = watch("password");
  return (
    <section className={scss.RegistrationPage}>
      <Image src={logo} alt="LOGO" />
      <h1>Создать аккаунт</h1>
      <form action="">
        <input
          type="text"
          {...register("email", { required: true })}
          placeholder="Email"
        />
        <input
          type="text"
          {...register("userName", { required: true })}
          placeholder="Имя аккаунта"
        />
        <input
          type="text"
          {...register("password", { required: true })}
          placeholder="Пароль"
        />
        <input
          type="text"
          {...register("confirmPassword", {
            required: true,
            validate: (value: string) =>
              value === "password" || "Пароли не совпадают",
          })}
          placeholder="Повторите пароль"
        />
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "transparent", // Основной цвет
              colorBorder: "#000", // Цвет границы
            },
          }}
        >
          <Checkbox
            className={scss.customCheckbox}
            onChange={handleRememberMeChange}
          >
            Сохранить вход
          </Checkbox>
        </ConfigProvider>
        <button type="submit">Зарегистрироваться</button>
      </form>
      <div className={scss.links}>
        <p>У вас уже есть аккаунт?</p>
        <Link href="/auth/sign-in" className={scss.link}>
          Войти
        </Link>
      </div>
    </section>
  );
};
export default SignUpPage;

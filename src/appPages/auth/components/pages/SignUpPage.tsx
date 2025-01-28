"use client";
import scss from "./SignUpPage.module.scss";
import { usePostRegistrationMutation } from "@/redux/api/auth";
import { ConfigProvider } from "antd";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Checkbox, { CheckboxChangeEvent } from "antd/es/checkbox";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/icons/logo.svg";
import google from "@/assets/icons/google.svg";
import { signIn } from "next-auth/react";

interface SignUpPrors {
  username: string;
  email: string
  password: string;
  confirm_password: string;
}

const SignUpPage: FC = () => {
  const [postRegisterMutation] = usePostRegistrationMutation();

  const { register, formState: { errors }, handleSubmit } =
    useForm<AUTH.PostRegistrationRequest>();

  const [rememberMe, setRememberMe] = useState(false);

  
  const handleRememberMeChange = (e: CheckboxChangeEvent) => {
    setRememberMe(e.target.checked);
  };

  const onSubmit: SubmitHandler<SignUpPrors> = async (userData) => {
    const userDataRest = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      confirm_password: userData.confirm_password,
    };

    try {
      const response = await postRegisterMutation(userDataRest);
      console.log("🚀 ~ constonSubmit:SubmitHandler<SignUpPrors>= ~ response:", response)
      
      if (response.data?.access) {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("accessToken", JSON.stringify(response.data));
        window.location.reload();
      }
    } catch (e) {
      console.error("An error occurred:", e);
    }
  };

  return (
    <section className={scss.RegistrationPage}>
      <Link href="/" className="Logo">
        <Image src={logo} alt="LOGO" />
      </Link>
      <h1>Создать аккаунт</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("username", { required: true })}
          placeholder="Имя аккаунта"
          aria-invalid={errors.username ? "true" : "false"}
          />
          {errors.username?.type === "required" && (
            <p role="alert">*Придумайте имя пользователя</p>
          )}
        <input
          type="text"
          {...register("email", { required: true })}
          placeholder="E-mail"
          aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email?.type === "required" && (
            <p role="alert">*Введите ваш адрес электронной почты</p>
          )}
        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="Пароль"
          aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password?.type === "required" && (
            <p role="alert">*Придумайте пароль</p>
          )}
        <input
          type="password"
          {...register("confirm_password", { required: true })}
          placeholder="Повторите пароль"
          aria-invalid={errors.confirm_password ? "true" : "false"}
          />
          {errors.confirm_password?.type === "required" && (
            <p role="alert">*Повторите пароль</p>
          )}
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "transparent", 
              colorBorder: "#000",
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

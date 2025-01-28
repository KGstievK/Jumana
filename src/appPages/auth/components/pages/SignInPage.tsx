"use client";
import scss from "./SignInPage.module.scss";
import { usePostLoginMutation } from "@/redux/api/auth";
import Checkbox, { CheckboxChangeEvent } from "antd/es/checkbox";
import { ConfigProvider } from "antd";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import logo from "@/assets/icons/logo.svg";
import google from "@/assets/icons/google.svg";
import { signIn } from "next-auth/react";

interface LoginProps {
  username: string;
  password: string;
}

const SignInPage: FC = () => {
  const [postLoginMutation] = usePostLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AUTH.PostLoginRequest>();
  const [rememberMe, setRememberMe] = useState(false);

  const handleRememberMeChange = (e: CheckboxChangeEvent) => {
    setRememberMe(e.target.checked);
  };

  const onSubmit: SubmitHandler<LoginProps> = async (userData) => {
    const datalogin = {
      username: userData.username,
      password: userData.password,
    };
    try {
      const response = await postLoginMutation(datalogin);
      if (response.data?.access) {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("accessToken", JSON.stringify(response.data));
      }
      window.location.reload();
    } catch (e) {
      console.error("An error occurred:", e);
    }
  };
  return (
    <section className={scss.LoginPage}>
      <Link href="/">
        <Image src={logo} alt="LOGO" />
      </Link>
      <h1>Войти в аккаунт</h1>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="User Name"
          {...register("username", { required: true })}
          aria-invalid={errors.username ? "true" : "false"}
          />
          {errors.username?.type === "required" && (
            <p role="alert">*Введите имя пользователя</p>
          )}

        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
          aria-invalid={errors.password ? "true" : "false"}
        />
         {errors.password && <p role="alert">*Введите пароль</p>}
        <div className={scss.links}>
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
          {/* <Link href="/auth/forgot" className={scss.link}>
            Забыли пароль?
          </Link> */}
        </div>
        <button type="submit">Войти</button>
      </form>
      <div className={scss.nav}>
        <p>У вас нет аккаунта?</p>
        <Link href="/auth/sign-up" className={scss.link}>
          Зарегестрироваться
        </Link>
      </div>
    </section>
  );
};

export default SignInPage;

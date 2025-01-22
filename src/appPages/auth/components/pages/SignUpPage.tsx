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

  const { register, watch, handleSubmit } =
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
        storage.setItem("accessToken", JSON.stringify(response.data.access));
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
        />
        <input
          type="text"
          {...register("email", { required: true })}
          placeholder="E-mail"
        />
        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="Пароль"
        />
        <input
          type="password"
          {...register("confirm_password", { required: true })}
          placeholder="Повторите пароль"
        />
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
      <div className={scss.orLine}>
        <div className={scss.line}></div>
        <p>или</p>
        <div className={scss.line}></div>
      </div>
      <div className={scss.google}>
        <button className={scss.Google_link} onClick={() => signIn("google")}>
          <Image src={google} alt="Google" />
        </button>
      </div>
    </section>
  );
};
export default SignUpPage;

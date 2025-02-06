"use client"
import Image from "next/image";
import scss from "./ForgotPage.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import logo from "@/assets/icons/logo.svg";
import Link from "next/link";
import { usePostPasswordResetMutation } from "@/redux/api/auth";
import { useRouter } from "next/navigation";

interface RegisterType {
  email: string;
}

const ForgotPage = () => {
  const [postPasswordResetMutation] = usePostPasswordResetMutation();
  const router = useRouter()

  const { register, handleSubmit } = useForm<RegisterType>();

  const [rememberMe, setRememberMe] = useState(false);

  const onSubmit: SubmitHandler<RegisterType> = async (userData) => {
    try {
      const response = await postPasswordResetMutation({ email: userData.email });
      if ('data' in response) {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("resetStatus", JSON.stringify(response.data));
      }
    } catch (e) {
      console.error("An error occurred:", e);
    }
  };

  return (
    <section className={scss.ForgotPage}>
      <Image src={logo} alt="LOGO" />
      <h1>Забыли пароль?</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
        />
        <button type="submit" onClick={() => router.push('/auth/reset_password')} >Отправить</button>
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

export default ForgotPage;

"use client"
import scss from "./SignUpPage.module.scss"
import { usePostRegistrationMutation } from "@/redux/api/auth";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Checkbox, { CheckboxChangeEvent } from "antd/es/checkbox";
import { Link } from "react-router-dom";

interface RegisterType {
	email: string;
	userName: string;
	photo: string;
	password: string;
	confirmPassword: string;
}


const SignUpPage = () => {
	const [postRegisterMutation] = usePostRegistrationMutation();

	const { register, watch, handleSubmit} = useForm<RegisterType>()

	const [rememberMe, setRememberMe] = useState(false);
	
	const onSubmit: SubmitHandler<RegisterType> = async (userData) => {
		const userDataRest = {
			userName: userData.userName,
			email: userData.email,
			password: userData.password,
			photo: userData.photo
		};

		try {
			const response = await postRegisterMutation(userDataRest);
			if (response.data?.accessToken) {
				const storage = rememberMe ? localStorage : sessionStorage;
				storage.setItem(
					'accessToken',
					JSON.stringify(response.data.accessToken)
				);
				// window.location.reload();
			}
		} catch (e) {
			console.error('An error occurred:', e);
		}
	};

  const handleRememberMeChange = (e: CheckboxChangeEvent) => {
		setRememberMe(e.target.checked);
  };

	const password = watch('password');
	return (
		<section className={scss.RegistrationPage}>
			<h1>Sign-Up Page</h1>
			<form action="">
				<input type="text" {...register("email", {required: true})} placeholder="email"/>
				<input type="text" {...register("userName", {required: true})} placeholder="Имя аккаунта"/>
				<input type="text" {...register("password", {required: true})} placeholder="Пароль"/>
				<input type="text" {...register("confirmPassword", {required: true, validate: (value: string) => value === 'password' || 'Пароли не совпадают'})} placeholder="Повторите пароль" />
				<Checkbox className={scss.customCheckbox} onChange={handleRememberMeChange}>
					Сохранить вход
				</Checkbox>
				<button type="submit">Зарегистрироваться</button>
			</form>
			<div className={scss.links}>
						<Link to="/auth/sign-in" className={scss.link}>
							У вас уже есть аккаунт?
						</Link>
						<Link to="/auth/forgot" className={scss.link}>
							Забыли пароль?
						</Link>
					</div>
		</section>
	);
};
export default SignUpPage;

'use client';
import scss from './SignInPage.module.scss';
import { usePostLoginMutation } from '@/redux/api/auth';
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

interface LoginType {
	email: string;
	password: string;
}

const SignInPage = () => {
	const [postLoginMutation] = usePostLoginMutation();
	const { register, handleSubmit } = useForm<LoginType>();
	const [rememberMe, setRememberMe] = useState(false);

	const handleRememberMeChange = (e: CheckboxChangeEvent) => {
		setRememberMe(e.target.checked);
	};

	const onSubmit: SubmitHandler<LoginType> = async (userData) => {
		// const datalogin = {
		// 	username: userData.username,
		// 	password: userData.password
		// }
		try {
			const response = await postLoginMutation(userData);
			// const responseToken = await refreshAccessToken(userData)
			if (response.data?.accessToken) {
				const storage = rememberMe ? localStorage : sessionStorage;
				storage.setItem(
					'accessToken',
					JSON.stringify(response.data.accessToken)
				);
				// storage.setItem("id", JSON.stringify(response.data.id!))
			}

			window.location.reload();
			console.log(response.data);
		} catch (e) {
			console.error('An error occurred:', e);
		}
	};
	return (
		<section className={scss.LoginPage}>
			<h1>Sign-In Page</h1>
			<form action="" onSubmit={handleSubmit(onSubmit)}>
				<input
					type="text"
					placeholder="User Name"
					{...register('email', { required: true })}
					/>
				<input
					type="password"
					placeholder="Password"
					{...register('password', { required: true })}
				/>
				<Checkbox
					className={scss.customCheckbox}
					onChange={handleRememberMeChange}
				>
					Сохранить вход
				</Checkbox>
				<button type="submit">Войти</button>
			</form>
			<div className={scss.links}>
				<Link to="/auth/sign-up" className={scss.link}>
					У вас нет аккаунта?
				</Link>
				<Link to="/auth/forgot" className={scss.link}>
					Забыли пароль?
				</Link>
			</div>
		</section>
	);
};

export default SignInPage;

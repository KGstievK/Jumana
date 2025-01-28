// import scss from './ResetPasswordPage.module.scss'
// import Image from 'next/image'
// import { SubmitHandler, useForm } from 'react-hook-form';
// import { usePatchResetPasswordMutation,  } from '@/redux/api/auth';
// import { useState } from 'react';
// import logo from "@/assets/icons/logo.svg";
// import Link from 'next/link';


// const ResetPasswordPage = () => {
//   const [PatchResetPasswordMutation] = usePatchResetPasswordMutation();

//   const { register, watch, handleSubmit } = useForm<AUTH.PatchResetPasswordRequest>();

//   const onSubmit: SubmitHandler<AUTH.PatchResetPasswordRequest> = async (userData) => {
//     const userDataRest = {
//       newPassword: userData.newPassword,
//       token: userData.access
//     };

//     try {
//       const response = await PatchResetPasswordMutation(userDataRest);
//       if (response.data) {
//         // window.location.reload();
//       }
//     } catch (e) {
//       console.error("An error occurred:", e);
//     }
//   };
  
//   return (
//     <section className={scss.ResetPasswordPage}>
//       <Image src={logo} alt="LOGO" />
//       <h1>Новый пароль</h1>
//       <form  onSubmit={handleSubmit(onSubmit)}>
//         <input
//           type="text"
//           {...register("newPassword", { required: true })}
//           placeholder="Пароль"
//         />
//         <input
//           type="text"
//           {...register("confirmPassword", {
//             required: true,
//             validate: (value: string) =>
//               value === "newPassword" || "Пароли не совпадают",
//           })}
//           placeholder="Повторите пароль"
//         />
//         <button type="submit">Войти</button>
//       </form>
//     </section>
//   )
// }

// export default ResetPasswordPage
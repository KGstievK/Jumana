import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<AUTH.GetResponse, AUTH.GetRequest>({
      query: () => ({
        url: "/auth/user",
        method: "GET",
      }),
      providesTags: ["auth"],
    }),
    postLogin: build.mutation<AUTH.PostLoginResponse, AUTH.PostLoginRequest>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    postRegistration: build.mutation<
      AUTH.PostRegistrationResponse,
      AUTH.PostRegistrationRequest
    >({
      query: (data) => ({
        url: "/auth/registration/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    postLogout: build.mutation<AUTH.PostLogoutResponse, AUTH.PostLogoutRequest>(
      {
        query: () => ({
          url: "/auth/logout",
          method: "POST",
        }),
        invalidatesTags: ["auth"],
      }
    ),
    patchRefreshToken: build.mutation<
      AUTH.PatchRefreshResponse,
      AUTH.PatchRefreshRequest
    >({
      query: () => ({
        url: "/auth/refresh",
        method: "PATCH",
      }),
      invalidatesTags: ["auth"],
    }),
    postForgotPassword: build.mutation<
      AUTH.PostForgotPasswordResponse,
      AUTH.PostForgotPasswordRequest
    >({
      query: (data) => ({
        url: "/auth/forgot",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    patchResetPassword: build.mutation<
      AUTH.PatchResetPasswordResponse,
      AUTH.PatchResetPasswordRequest
    >({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});
export const {
  useGetMeQuery,
  usePostLoginMutation,
  usePostRegistrationMutation,
  usePostLogoutMutation,
  usePatchRefreshTokenMutation,
  usePatchResetPasswordMutation,
  usePostForgotPasswordMutation,
} = api;

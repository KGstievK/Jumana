import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<AUTH.GetResponse, AUTH.GetRequest>({
      query: () => ({
        url: `/profile/`,
        method: "GET",
      }),
      providesTags: ["auth"],
    }),
    postLogin: build.mutation<AUTH.PostLoginResponse, AUTH.PostLoginRequest>({
      query: (data) => ({
        url: "/login/",
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
        url: "/register/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    postLogout: build.mutation<AUTH.PostLogoutResponse, AUTH.PostLogoutRequest>(
      {
        query: () => ({
          url: "/logout/",
          method: "POST",
        }),
        invalidatesTags: ["auth"],
      }
    ),
    putMe: build.mutation<AUTH.PutMeResponse, AUTH.PutMeRequest>({
      query: ({ id, ...data }) => ({
        url: `/profile/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    patchRefreshToken: build.mutation<
      AUTH.PatchRefreshResponse,
      AUTH.PatchRefreshRequest
    >({
      query: (data) => ({
        url: "/api/token/refresh/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    postPasswordReset: build.mutation<
      AUTH.PostForgotPasswordResponse,
      AUTH.PostForgotPasswordRequest
    >({
      query: (data) => ({
        url: "/password_reset/",
        method: "POST",
        body: data,
      }),
    }),
    postVerifyResetCode: build.mutation<
    AUTH.PostVerifyResetCodeResponse,
    AUTH.PostVerifyResetCodeRequest
    >({
      query: (data) => ({
        url: "/password_reset/verify_code/",
        method: "POST",
        body: data,
      }),
    }),
    postValidateToken: build.mutation<AUTH.PostValidateTokenResponse, AUTH.PostValidateTokenRequest>({
      query: (data) => ({
        url: "/password_reset/validate_token/",
        method: "POST",
        body: data,
      }),
    }),
    postConfirmReset: build.mutation<
      AUTH.PostConfirmResetResponse,
      AUTH.PostConfirmResetRequest
    >({
      query: (data) => ({
        url: "/password_reset/confirm/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetMeQuery,
  usePutMeMutation,
  usePostLoginMutation,
  usePostRegistrationMutation,
  usePostLogoutMutation,
  usePatchRefreshTokenMutation,
  usePostPasswordResetMutation,
  usePostVerifyResetCodeMutation,
  usePostValidateTokenMutation,
  usePostConfirmResetMutation,
} = api;

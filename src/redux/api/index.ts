import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
  prepareHeaders: (headers) => {
    let token = localStorage.getItem("accessToken")
      ? JSON.parse(String(localStorage.getItem("accessToken")))
      : null;

    if (!token) {
      token = sessionStorage.getItem("accessToken")
        ? JSON.parse(String(sessionStorage.getItem("accessToken")))
        : null;
    }

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    // Устанавливаем Content-Type для запросов с JSON-данными
    headers.set("Content-Type", "application/json");

    return headers;
  },
});

const baseQueryExtended: BaseQueryFn = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryExtended,
  refetchOnReconnect: true,
  refetchOnFocus: false,
  tagTypes: ["auth", "product", "slider", "category"],
  endpoints: () => ({}),
});

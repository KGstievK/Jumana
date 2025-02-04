import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
	baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
	prepareHeaders: (headers) => {
		let token = null;
		if (typeof window !== "undefined") {  // Убедимся, что код выполняется на клиенте
      const localStorageData = JSON.parse(localStorage.getItem("accessToken") || "null");
      const SessionStorageData = JSON.parse(sessionStorage.getItem("accessToken") || "null");

      token = SessionStorageData?.access || localStorageData?.access || null;
    }

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
	}
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
  tagTypes: ["auth", "product", "slider", "category", 'review'],
  endpoints: () => ({}),
});

import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getAllCategory: build.query({
      query: () => ({
        url: "/category/",
        method: "GET",
      }),
      providesTags: ["category"],
    }),

    getAllClothes: build.query<
      ICATEGORY.getAllClothesRes,
      ICATEGORY.getAllClothesReq
    >({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["category"],
    }),
  }),
});

export const { useGetAllCategoryQuery, useGetAllClothesQuery } = api;

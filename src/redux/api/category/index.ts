import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getAllCategory: build.query<
      ICATEGORY.getCategoryRes,
      ICATEGORY.getCategoryReq
    >({
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

    getClothesById: build.query<
      ICATEGORY.getClothesByIdRes,
      ICATEGORY.getClothesByIdReq
    >({
      query: (id) => ({
        url: `/${id}/`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),

    postToFavorite: build.mutation({
      query: () => ({
        url: "/favorite_item/",
        method: "POST",
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useGetAllCategoryQuery,
  useGetAllClothesQuery,
  useGetClothesByIdQuery,
  usePostToFavoriteMutation,
} = api;

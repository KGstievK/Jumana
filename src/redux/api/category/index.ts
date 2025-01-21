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

    getToFavorite: build.query<
      ICATEGORY.getToFavoreRes,
      ICATEGORY.getToFavoreReq
    >({
      query: () => ({
        url: "/favorite_item/list/",
        method: "GET",
      }),
      providesTags: ["category"],
    }),

    postToFavorite: build.mutation<
      ICATEGORY.postToFavoreRes,
      ICATEGORY.postToFavoreReq
    >({
      query: (data) => ({
        url: "/favorite_item/create/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),

    deleteFavorite: build.mutation<
      ICATEGORY.deleteFavoreRes,
      ICATEGORY.deleteFavoreReq
    >({
      query: (id) => ({
        url: `/favorite_item/delete/${id}/`,
        method: "DELETE",
        body: id,
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
  useGetToFavoriteQuery,
  useDeleteFavoriteMutation,
} = api;

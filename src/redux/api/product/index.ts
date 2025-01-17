import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getProduct: build.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    postProduct: build.mutation({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),
    patchProduct: build.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
    getBasket: build.query<PRODUCT.getBasketRes, PRODUCT.getBasketReq>({
      query: () => ({
        url: `/cart_item/check/`,
        method: "GET",
      }),
    }),
    getCartItem: build.query<PRODUCT.getCartItemRes, PRODUCT.getCartItemReq>({
      query: (id) => ({
        url: `/cart_item/${id}/`,
        method: "GET",
      }),
    }),
    addToBasket: build.mutation<PRODUCT.addToBasketRes, PRODUCT.addToBasketReq>(
      {
        query: (data) => ({
          url: `/cart_item/create/`,
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["product"],
      }
    ),
  }),
});

export const {
  useGetProductQuery,
  usePostProductMutation,
  usePatchProductMutation,
  useDeleteProductMutation,
  useGetBasketQuery,
  useAddToBasketMutation,
  useGetCartItemQuery,
} = api;

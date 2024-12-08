import {api as index} from '..'


const api = index.injectEndpoints({
  endpoints: (build) => ({
    getProduct: build.query({
      query: () => ({
        url: '/',
        method: 'GET'
      }),
      providesTags: ['product']
    }),
    postProduct: build.mutation({
      query: (data) => ({
        url: '',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['product']
    }),
    patchProduct: build.mutation({
      query: ({id, data}) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['product']
    }),
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['product']
    }),

  })
})

export const {useGetProductQuery, usePostProductMutation, usePatchProductMutation, useDeleteProductMutation} = api
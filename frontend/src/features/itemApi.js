import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const itemApi = createApi({
  reducerPath: 'itemApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  tagTypes: ['Item'],
  endpoints: (builder) => ({
    createItem: builder.mutation({
      query: (data) => ({ url: 'item', method: 'POST', body: data }),
      invalidatesTags: ['Item']
    }),
    readItem: builder.query({
      query: () => 'item',
      providesTags: ['Item']
    }),
    updateItem: builder.mutation({
      query: ({ id, ...data }) => ({ url: `item/${id}`, method: 'PUT', body: data }),
      invalidatesTags: ['Item']
    }),
    deleteItem: builder.mutation({
      query: (id) => ({ url: `item/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Item']
    }),
  }),
});

export const { useCreateItemMutation, useReadItemQuery, useUpdateItemMutation, useDeleteItemMutation } = itemApi;
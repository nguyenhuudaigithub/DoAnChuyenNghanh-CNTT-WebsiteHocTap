import { apiSlice } from '../api/apiSlice';

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrdersInfo: builder.query({
      query: (type) => ({
        url: `get-orders`,
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),
  }),
});

export const { useGetAllOrdersInfoQuery } = orderApi;

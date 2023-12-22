import { apiSlice } from "../api/apiSlice";

export const chatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createChat: builder.mutation({
      query: (data) => ({
        url: "create-chat",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    replyChat: builder.mutation({
      query: ({ id, data }) => ({
        url: `chat/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),

    getAllChat: builder.mutation({
      query: ({chatAdmin}) => ({
        url: "/get-all-chat",
        method: "POST",
        body: chatAdmin,
        credentials: "include" as const,
      }),
    }),

    getSingleChat: builder.query({
      query: (id) => ({
        url: `chat/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});
export const {
  useCreateChatMutation,
  useReplyChatMutation,
  useGetAllChatMutation,
  useGetSingleChatQuery,
} = chatApi;

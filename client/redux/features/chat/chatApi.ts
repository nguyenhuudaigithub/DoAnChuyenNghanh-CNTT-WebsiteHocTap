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

    replyChatAdmin: builder.mutation({
      query: ({ id, data }) => ({
        url: `chat-admin/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),

    getAllChatUser: builder.query({
      query: () => ({
        url: "/get-all-chat-user",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    
    getAllChatAdmin: builder.query({
      query: () => ({
        url: "/get-all-chat-admin",
        method: "GET",
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

    rename: builder.mutation({
      query: ({ id, data }) => ({
        url: `edit-name-group/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),

    outGroup: builder.mutation({
      query: ({ id }) => ({
        url: `/out-group/${id}`,
        method: "POST",
        credentials: "include" as const,
      }),
    }),
  }),
});
export const {
  useCreateChatMutation,
  useReplyChatMutation,
  useReplyChatAdminMutation,
  useGetSingleChatQuery,
  useRenameMutation,
  useOutGroupMutation,
  useGetAllChatAdminQuery,
  useGetAllChatUserQuery,
} = chatApi;

import { apiSlice } from "../api/apiSlice";

export const blogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBlog: builder.mutation({
      query: (data) => ({
        url: "create-blog",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),

    getUserAllBlogs: builder.query({
      query: () => ({
        url: `get-all-blogs-user`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getSingleBlog: builder.query({
      query: (id) => ({
        url: `get-single-blog/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    addNewQuestionBlog: builder.mutation({
      query: ({ question, blogId }) => ({
        url: "add-question-blog",
        body: { question, blogId },
        method: "PUT",
        credentials: "include" as const,
      }),
    }),

    addAnswerInQuestionBlog: builder.mutation({
      query: ({ answer, blogId, questionId }) => ({
        url: "add-anwser-blog",
        body: { answer, blogId, questionId },
        method: "PUT",
        credentials: "include" as const,
      }),
    }),

    getAdminAllBlogs: builder.query({
      query: () => ({
        url: `get-admin-all-blogs`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `delete-blog/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),

    editBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `edit-blogs-id/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
  }),
});
export const {
  useCreateBlogMutation,
  useGetUserAllBlogsQuery,
  useGetSingleBlogQuery,
  useAddNewQuestionBlogMutation,
  useAddAnswerInQuestionBlogMutation,
  useGetAdminAllBlogsQuery,
  useDeleteBlogMutation,
  useEditBlogMutation
} = blogApi;

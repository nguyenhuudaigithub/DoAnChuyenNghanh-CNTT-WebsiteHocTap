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
  }),
});
export const { useCreateBlogMutation,useGetUserAllBlogsQuery, useGetSingleBlogQuery } = blogApi;

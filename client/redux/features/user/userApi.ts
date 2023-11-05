import { apiSlice } from "../api/apiSlice";
import { store } from "../../store";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //api avatar
    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: "update-user-avatar",
        method: "PUT",
        body: { avatar },
        credentials: "include" as const,
      }),
    }),

    //api update user
    editProfile: builder.mutation({
      query: ({ name }) => ({
        url: "update-user-info",
        method: "PUT",
        body: { name },
        credentials: "include" as const,
      }),
    }),
    //api update password
    updatePassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: "update-user-password",
        method: "PUT",
        body: { oldPassword, newPassword },
        credentials: "include" as const,
      }),
    }),
    // get all users
    getAllUsers:builder.query({
      query: () => ({
        url: "get-users",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    // update user role 
    updateUserRole: builder.mutation({
      query: ({ email, role }) => ({
        url: "update-user",
        method: "PUT",
        body: { email, role },
        credentials: "include" as const,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `delete-user/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useUpdateAvatarMutation, useEditProfileMutation, useUpdatePasswordMutation, useGetAllUsersQuery, useUpdateUserRoleMutation, useDeleteUserMutation } = userApi;

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
  }),
});

export const { useUpdateAvatarMutation, useEditProfileMutation, useUpdatePasswordMutation } = userApi;

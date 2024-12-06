import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../types/user.types";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY_SPEAKER;

if (!BASE_URL || !API_KEY) {
  throw new Error("BASE_URL eller API_KEY er ikke definert i miljøvariabler");
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${API_KEY}`);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => `/users`,
      transformResponse: (response: { items: User[] }): User[] => response.items,
      providesTags: ["Users"],
    }),
    addUser: builder.mutation<void, Partial<User>>({
      query: (newUser) => ({
        url: `/users`,
        method: "POST",
        body: [
          {
            username: newUser.username,
            password: newUser.password,
            role: "user",
          },
        ],
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation<void, Partial<User> & { _uuid: string }>({
      query: ({ _uuid, ...updatedUser }) => ({
        url: `/users/${_uuid}`,
        method: "PUT",
        body: updatedUser,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (_uuid) => ({
        url: `/users/${_uuid}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;







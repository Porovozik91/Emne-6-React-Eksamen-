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
          transformResponse: (response: { items: User[] }, meta) => {
            const status = meta?.response?.status;
            const userResponse = response.items.map((user) => ({
              _id: user._uuid,
              name: user.name,
              email: user.email,
              role: user.role,
            }));
    
            if (status === 200) {
              console.log(`Status: ${status} OK`);
            } else if (status === 403) {
              console.error(`Status: ${status} Forbidden`);
            } else {
              console.error(`Uventet status: ${status}`);
            }
    
            console.log(`GET /users:`, userResponse);
            return response.items;
          },
          providesTags: ["Users"],
        }),


        addUser: builder.mutation<void, Partial<User>>({
          query: (newUser) => ({
            url: `/users`,
            method: "POST",
            body: [
              {
                name: newUser.name,
                email: newUser.email,
                password: newUser.password,
                role: "user",
              },
            ],
          }),
          transformResponse: (_, meta) => {
            console.log(`POST /users - Status: ${meta?.response?.status}`);
            if (meta?.response?.status === 400) {
              console.error("Brukeren finnes allerede.");
            } else if (meta?.response?.status === 201) {
              console.log("Bruker er opprettet.");
            }
          },
          invalidatesTags: ["Users"],
        }),

        updateUser: builder.mutation<void, Partial<User> & { _uuid: string }>({
          query: ({ _uuid, ...updatedUser }) => ({
            url: `/users/${_uuid}`,
            method: "PUT",
            body: updatedUser,
          }),
          transformResponse: (_, meta) => {
            console.log(`Status: ${meta?.response?.status}`);
            if (meta?.response?.status === 404) {
              console.error("Brukeren ble ikke funnet.");
            } else if (meta?.response?.status === 200) {
              console.log("Bruker er oppdatert.");
            }
          },
          invalidatesTags: ["Users"],
        }),
        
        deleteUser: builder.mutation<void, string>({
          query: (_uuid) => ({
            url: `/users/${_uuid}`,
            method: "DELETE",
          }),
          transformResponse: (_, meta) => {
            console.log(`Status: ${meta?.response?.status}`);
            if (meta?.response?.status === 404) {
              console.error("Brukeren ble ikke funnet.");
            } else if (meta?.response?.status === 200) {
              console.log("Bruker er slettet.");
            }
          },
          invalidatesTags: ["Users"],
        }),
      }),
    });
    
    export const {
      useGetUsersQuery,
      useLazyGetUsersQuery, // Legger til lazy query
      useAddUserMutation,
      useUpdateUserMutation,
      useDeleteUserMutation,
    } = userApi;





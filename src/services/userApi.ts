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
            const status = meta?.response?.status;
            console.log(`POST /users - Status: ${status}`);
            if (status === 201) {
                console.log("Status: 201 - Created: Bruker opprettet.");
            } else if (status === 400) {
                console.error("Status: 400 - Bad Request.");
            } else {
              console.error(`Status: ${status} - Uventet feil.`);
            }
        },
          invalidatesTags: ["Users"],
        }),


        getUsers: builder.query<User[], void>({
          query: () => `/users`,
          transformResponse: (response: { items: User[] }, meta) => {
            const status = meta?.response?.status;
            const userResponse = response.items.map((user) => ({
              id: user._uuid,
              name: user.name,
              email: user.email,
              role: user.role,
            }));
        
            if (status === 200) {
              console.log(`Status: ${status} - OK: Liste over brukere hentet.`, userResponse);
            } else if (status === 403) {
              console.error(`Status: ${status} - Forbidden: Mangler admin-rettigheter.`);
            } else {
              console.error(`Status: ${status} - Uventet feil.`);
            }
            return response.items;
          },
          providesTags: ["Users"],
        }),
        

        updateUser: builder.mutation<void, Partial<User> & { _uuid: string }>({
          query: ({ _uuid, ...updatedUser }) => ({
            url: `/users/${_uuid}`,
            method: "PUT",
            body: updatedUser,
          }),
          transformResponse: (_, meta) => {
            const status = meta?.response?.status;
            if (status === 200) {
              console.log(`Status: ${status} - OK: Bruker oppdatert.`);
            } else if (status === 403) {
              console.error(`Status: ${status} - Forbidden: Mangler admin-rettigheter.`);
            } else if (status === 404) {
              console.error(`Status: ${status} - Not Found: Brukeren finnes ikke.`);
            } else {
              console.error(`Status: ${status} - Uventet feil.`);
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
            const status = meta?.response?.status;
            if (status === 200) {
              console.log(`Status: ${status} - OK: Bruker slettet.`);
            } else if (status === 403) {
              console.error(`Status: ${status} - Forbidden: Mangler admin-rettigheter.`);
            } else if (status === 404) {
              console.error(`Status: ${status} - Not Found: Brukeren finnes ikke.`);
            } else {
              console.error(`Status: ${status} - Uventet feil.`);
            }
          },
          invalidatesTags: ["Users"],
        }),
      }),
    });
    
    export const {
      useGetUsersQuery,
      useLazyGetUsersQuery, 
      useAddUserMutation,
      useUpdateUserMutation,
      useDeleteUserMutation,
    } = userApi;





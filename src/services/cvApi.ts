import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Cv } from "../types/cv.types";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY_SPEAKER;

if (!BASE_URL || !API_KEY) {
  throw new Error("BASE_URL eller API_KEY er ikke definert i miljøvariabler");
}

export const cvApi = createApi({
  reducerPath: "cvApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${API_KEY}`);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Cvs"],
  endpoints: (builder) => ({

   //post
    createCv: builder.mutation<void, Partial<Cv>>({
      query: (newCv) => ({
        url: `/cvs`,
        method: "POST",
        body: [{
          ...newCv,
        }],
      }),
      transformResponse: (_, meta) => {
        const status = meta?.response?.status;
        console.log(`POST /cvs - Status: ${status}`);
    
        if (status === 201) {
          console.log(`Status: ${status} Created - CV opprettet.`);
        } else if (status === 400) {
          console.error(`Status: ${status} - Bad Request.`);
        } else {
          console.error("Kunne ikke opprette CV.");
        }
      },
      invalidatesTags: ["Cvs"],
    }),
    

    // Hent alle CV-er (for admin)
    getAllCvs: builder.query<Cv[], void>({
      query: () => `/cvs`,
      transformResponse: (response: { items: Cv[] }, meta) => {
        const status = meta?.response?.status;
        const userResponse = response.items.map((cv) => ({
          userId: cv.userid,
          title: cv.title
        }));
        if (status === 200) {
          console.log(`Status: ${status} OK - CV-er hentet.`);
        } else if (status === 403) {
          console.error(`Status: ${status} Forbidden.`);
        } else {
          console.error(`Uventet status: ${status}`);
        }
        console.log(`Liste over GET /cvs - Respons:`, userResponse);
        return response.items;
      },
      providesTags: ["Cvs"],
    }),

    // Hent CV-er for en spesifikk bruker
    getUserCvs: builder.query<Cv[], string>({
      query: (userId) => `/users/${userId}/cvs`,
      transformResponse: (response: { items: Cv[] }, meta) => {
        const status = meta?.response?.status;
        const userResponse = response.items.map((cv) => ({
          userId: cv.userid,
        }));
        if (status === 200) {
          console.log(`Status: ${status} OK - CV-er for bruker ${userResponse} hentet.`);
        } else if (status === 403) {
          console.error(`Status: ${status} Forbidden.`);
        } else {
          console.error(`Uventet status: ${status}`);
        }
        console.log(`GET /users/${userResponse}/cvs - Respons:`, response.items);
        return response.items;
      },
      providesTags: ["Cvs"],
    }),

    deleteCv: builder.mutation<void, string>({
      query: (cvId) => ({
        url: `/cvs/${cvId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cvs"],
    }),
    
    updateCv: builder.mutation<void, Partial<Cv>>({
      query: (updatedCv) => ({
        url: `/cvs/${updatedCv._uuid}`,
        method: "PUT",
        body: updatedCv,
      }),
      invalidatesTags: ["Cvs"],
    }),

   
    })
  })

export const { 
 useCreateCvMutation,
  useGetAllCvsQuery,
  useLazyGetAllCvsQuery,
  useGetUserCvsQuery,
  useLazyGetUserCvsQuery,
  useUpdateCvMutation,
  useDeleteCvMutation
} = cvApi;
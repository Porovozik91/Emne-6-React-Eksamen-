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

    // Opprett ny CV
    createCv: builder.mutation<void, Partial<Cv>>({
      query: (newCv) => ({
        url: `/cvs`,
        method: "POST",
        body: [
          {
            ...newCv,
          },
        ],
      }),
      transformResponse: (_, meta) => {
        console.log(`POST /cvs - Status: ${meta?.response?.status}`);
        if (meta?.response?.status === 201) {
          console.log("CV opprettet.");
        } else {
          console.error("Kunne ikke opprette CV.");
        }
      },
      invalidatesTags: ["Cvs"],
    }),

    getCvs: builder.query<Cv[], void>({
      query: () => "/cvs",
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
  }),
});

export const { 
  useCreateCvMutation,
  useGetCvsQuery, 
  useLazyGetCvsQuery, 
  useDeleteCvMutation, 
  useUpdateCvMutation 
} = cvApi;
  


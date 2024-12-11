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
          console.error(`Status: ${status} Forbidden - Tilgang nektet.`);
        } else {
          console.error(`Uventet status: ${status}`);
        }
        console.log(`Liste over GET /cvs - Respons:`, userResponse);
        return response.items;
      },
      providesTags: ["Cvs"],
    }),
    })
  })

export const { 
  useCreateCvMutation,
  useGetAllCvsQuery,
  useLazyGetAllCvsQuery,
} = cvApi;
  


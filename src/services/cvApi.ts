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
    addCv: builder.mutation<void, Partial<Cv>>({
        query: (newCv) => ({
          url: `/cvs`,
          method: "POST",
          body: [
            {
              ...newCv,
            },
          ],
        }),
        invalidatesTags: ["Cvs"],
    }),
  }),
});

export const {
  useAddCvMutation,
} = cvApi;

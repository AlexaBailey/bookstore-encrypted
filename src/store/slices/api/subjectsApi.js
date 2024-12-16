import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const subjectsApi = createApi({
  reducerPath: "subjectsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001/api" }),
  endpoints: (builder) => ({
    getSubjects: builder.query({
      query: () => "/subject",
    }),
    getSubjectById: builder.query({
      query: (id) => `/subject/${id}`,
    }),

    addSubject: builder.mutation({
      query: (newSubject) => ({
        url: "/subject",
        method: "POST",
        body: newSubject,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    updateSubject: builder.mutation({
      query: ({ id, ...updatedSubject }) => ({
        url: `/subject/${id}`,
        method: "PUT",
        body: updatedSubject,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    deleteSubject: builder.mutation({
      query: (id) => ({
        url: `/subject/${id}`,
        method: "DELETE",
      }),
    }),

    downloadSubjectFile: builder.query({
      query: (id) => ({
        url: `/subject/${id}/download`,
        responseHandler: (response) => response.blob(),
      }),
    }),
  }),
});

export const {
  useGetSubjectsQuery,
  useGetSubjectByIdQuery,
  useAddSubjectMutation,
  useUpdateSubjectMutation,
  useDeleteSubjectMutation,
  useDownloadSubjectFileQuery,
} = subjectsApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const subjectsApi = createApi({
  reducerPath: "subjectsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001/api" }),
  endpoints: (builder) => ({
    getSubjects: builder.query({
      query: () => "/subjects",
    }),
    getSubjectById: builder.query({
      query: (id) => `/subjects/${id}`,
    }),

    addSubject: builder.mutation({
      query: (newSubject) => ({
        url: "/subjects",
        method: "POST",
        body: newSubject,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    updateSubject: builder.mutation({
      query: ({ id, ...updatedSubject }) => ({
        url: `/subjects/${id}`,
        method: "PUT",
        body: updatedSubject,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    deleteSubject: builder.mutation({
      query: (id) => ({
        url: `/subjects/${id}`,
        method: "DELETE",
      }),
    }),

    downloadSubjectFile: builder.query({
      query: (id) => ({
        url: `/subjects/${id}/download`,
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

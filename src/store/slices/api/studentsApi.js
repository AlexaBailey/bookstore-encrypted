import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const studentsApi = createApi({
  reducerPath: "studentsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001/api" }),
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => "/student",
    }),
    getStudentById: builder.query({
      query: (id) => `/student/${id}`,
    }),
    createStudent: builder.mutation({
      query: (newStudent) => ({
        url: "/student",
        method: "POST",
        body: newStudent,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    updateStudent: builder.mutation({
      query: ({ id, ...updatedStudent }) => ({
        url: `/student/${id}`,
        method: "PUT",
        body: updatedStudent,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/student/${id}`,
        method: "DELETE",
      }),
    }),
    downloadStudentFile: builder.query({
      query: (id) => ({
        url: `/student/${id}/download`,
        responseHandler: (response) => response.blob(),
      }),
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useGetStudentByIdQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
  useDownloadStudentFileQuery,
} = studentsApi;

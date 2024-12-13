import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const professorsApi = createApi({
  reducerPath: "professorsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001/api" }),
  endpoints: (builder) => ({
    getProfessors: builder.query({
      query: () => "/professor",
    }),

    getProfessorById: builder.query({
      query: (id) => `/professor/${id}`,
    }),

    createProfessor: builder.mutation({
      query: (newProfessor) => ({
        url: "/professor",
        method: "POST",
        body: newProfessor,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    updateProfessor: builder.mutation({
      query: ({ id, ...updatedProfessor }) => ({
        url: `/professor/${id}`,
        method: "PUT",
        body: updatedProfessor,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    deleteProfessor: builder.mutation({
      query: (id) => ({
        url: `/professor/${id}`,
        method: "DELETE",
      }),
    }),

    deleteScheduleItem: builder.mutation({
      query: ({ id, scheduleId }) => ({
        url: `/professor/${id}/schedule/${scheduleId}`,
        method: "DELETE",
      }),
    }),

    deleteEvaluation: builder.mutation({
      query: ({ id, evaluationId }) => ({
        url: `/professor/${id}/evaluation/${evaluationId}`,
        method: "DELETE",
      }),
    }),

    deleteProfessorSubject: builder.mutation({
      query: ({ id, subjectId }) => ({
        url: `/professor/${id}/subject/${subjectId}`,
        method: "DELETE",
      }),
    }),

    addProfessorSubject: builder.mutation({
      query: ({ id, subjectId }) => ({
        url: `/professor/${id}/subject/${subjectId}`,
        method: "POST",
      }),
    }),

    downloadProfessorFile: builder.query({
      query: (id) => ({
        url: `/professor/${id}/download`,
        responseHandler: (response) => response.blob(),
      }),
    }),
  }),
});

export const {
  useGetProfessorsQuery,
  useGetProfessorByIdQuery,
  useCreateProfessorMutation,
  useUpdateProfessorMutation,
  useDeleteProfessorMutation,
  useDeleteScheduleItemMutation,
  useDeleteEvaluationMutation,
  useDeleteProfessorSubjectMutation,
  useAddProfessorSubjectMutation,
  useDownloadProfessorFileQuery,
} = professorsApi;

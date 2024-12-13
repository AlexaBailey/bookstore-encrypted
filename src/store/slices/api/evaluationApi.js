import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const evaluationApi = createApi({
  reducerPath: "evaluationApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001/api" }),
  endpoints: (builder) => ({
    getEvaluationById: builder.query({
      query: (id) => `/evaluation/${id}`,
    }),

    saveEvaluationResults: builder.mutation({
      query: ({ id, results }) => ({
        url: `/evaluation/${id}`,
        method: "POST",
        body: results,
      }),
    }),

    downloadEvaluationFile: builder.query({
      query: (id) => ({
        url: `/evaluation/${id}/download`,
        responseType: "blob",
      }),
    }),

    deleteEvaluation: builder.mutation({
      query: ({ professorId, evaluationId }) => ({
        url: `/professors/${professorId}/evaluation/${evaluationId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetEvaluationByIdQuery,
  useSaveEvaluationResultsMutation,
  useDownloadEvaluationFileQuery,
  useDeleteEvaluationMutation,
} = evaluationApi;

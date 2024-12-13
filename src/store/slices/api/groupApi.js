import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const groupApi = createApi({
  reducerPath: "groupApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001/api" }),
  endpoints: (builder) => ({
    getGroups: builder.query({
      query: () => "/group",
    }),
    getGroup: builder.query({
      query: (id) => `/group/${id}`,
    }),
    addGroup: builder.mutation({
      query: (newGroup) => ({
        url: "/group",
        method: "POST",
        body: newGroup,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    updateGroup: builder.mutation({
      query: ({ id, ...updatedGroup }) => ({
        url: `/group/${id}`,
        method: "PUT",
        body: updatedGroup,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    deleteGroup: builder.mutation({
      query: (id) => ({
        url: `/group/${id}`,
        method: "DELETE",
      }),
    }),
    downloadGroupFile: builder.query({
      query: (id) => ({
        url: `/group/${id}/download`,
        method: "GET",
        responseHandler: (response) => response.blob(),
      }),
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useGetGroupQuery,
  useAddGroupMutation,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
  useDownloadGroupFileQuery,
} = groupApi;

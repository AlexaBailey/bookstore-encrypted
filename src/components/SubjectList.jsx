import React from "react";
import { useGetSubjectsQuery } from "../store/slices/api/subjectsApi";
import SubjectItem from "./SubjectItem";

const SubjectList = () => {
  const { data: subjects = [], isLoading } = useGetSubjectsQuery();

  if (isLoading) return <p>Loading subjects...</p>;

  return (
    <table className="min-w-full bg-white border border-gray-200 rounded-lg mt-3">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left">ID</th>
          <th className="px-4 py-2 text-left">Name</th>
          <th className="px-4 py-2 text-left">Edit</th>
          <th className="px-4 py-2 text-left">Delete</th>
        </tr>
      </thead>
      <tbody>
        {subjects.map((subject) => (
          <SubjectItem key={subject.id} subject={subject} />
        ))}
      </tbody>
    </table>
  );
};

export default SubjectList;

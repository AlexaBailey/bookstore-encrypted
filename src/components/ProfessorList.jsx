import React from "react";
import { useGetProfessorsQuery } from "../store/slices/api/professorApi";
import ProfessorItem from "./ProfessorItem";

const ProfessorList = () => {
  const { data: professors = [], isLoading } = useGetProfessorsQuery();

  if (isLoading) return <p>Loading...</p>;

  return (
    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left">ID</th>
          <th className="px-4 py-2 text-left">First Name</th>
          <th className="px-4 py-2 text-left">Last Name</th>
          <th className="px-4 py-2 text-left">Date of Birth</th>
          <th className="px-4 py-2 text-left">Edit</th>
          <th className="px-4 py-2 text-left">Delete</th>
          <th className="px-4 py-2 text-left">Download</th>
        </tr>
      </thead>
      <tbody>
        {professors.map((professor) => (
          <ProfessorItem key={professor.id} professor={professor} />
        ))}
      </tbody>
    </table>
  );
};

export default ProfessorList;

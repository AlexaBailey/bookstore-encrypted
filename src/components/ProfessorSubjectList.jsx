import React from "react";
import ProfessorSubjectItem from "./ProfessorSubjectItem";

const ProfessorSubjectList = ({ subjects }) => {
  if (!subjects || subjects.length === 0) {
    return <p className="text-gray-500">No subjects available.</p>;
  }

  return (
    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left">Subject Name</th>
          <th className="px-4 py-2 text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        {subjects.map((subject) => (
          <ProfessorSubjectItem key={subject.id} subject={subject} />
        ))}
      </tbody>
    </table>
  );
};

export default ProfessorSubjectList;

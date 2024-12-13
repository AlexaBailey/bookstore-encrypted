import React from "react";
import { useGetStudentsQuery } from "../store/slices/api/studentsApi";
import StudentItem from "./StudentItem";

const StudentList = () => {
  const { data: students = [], isLoading } = useGetStudentsQuery();

  if (isLoading) return <p>Loading students...</p>;

  return (
    <table className="min-w-full bg-white border border-gray-200 rounded-lg mt-3">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left">ID</th>
          <th className="px-4 py-2 text-left">First Name</th>
          <th className="px-4 py-2 text-left">Last Name</th>
          <th className="px-4 py-2 text-left">Group</th>
          <th className="px-4 py-2 text-left">Edit</th>
          <th className="px-4 py-2 text-left">Delete</th>
          <th className="px-4 py-2 text-left">Download</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <StudentItem key={student.id} student={student} />
        ))}
      </tbody>
    </table>
  );
};

export default StudentList;

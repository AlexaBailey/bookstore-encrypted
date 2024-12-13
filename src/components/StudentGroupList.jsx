import React from "react";
import StudentGroupItem from "./StudentGroupItem";

const StudentGroupList = ({ students }) => {
  if (!students || students.length === 0) {
    return (
      <h3 className="text-gray-500 text-center mt-6">
        The student list is empty.
      </h3>
    );
  }

  return (
    <table className="min-w-full bg-white border border-gray-200 rounded-lg mt-3">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left">First Name</th>
          <th className="px-4 py-2 text-left">Last Name</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <StudentGroupItem key={student.id} student={student} />
        ))}
      </tbody>
    </table>
  );
};

export default StudentGroupList;

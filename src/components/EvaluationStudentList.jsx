import React from "react";
import EvaluationStudentListItem from "./EvaluationStudentListItem";

const EvaluationStudentList = ({ students, onGradeChange, initialGrades }) => {
  if (!students || students.length === 0) {
    return <p className="text-gray-500">No students available.</p>;
  }

  return (
    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-2 text-left">First Name</th>
          <th className="px-4 py-2 text-left">Last Name</th>
          <th className="px-4 py-2 text-left">Grade</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <EvaluationStudentListItem
            key={student.id}
            student={student}
            initialGrade={initialGrades[student.id]}
            onGradeChange={onGradeChange}
          />
        ))}
      </tbody>
    </table>
  );
};

export default EvaluationStudentList;

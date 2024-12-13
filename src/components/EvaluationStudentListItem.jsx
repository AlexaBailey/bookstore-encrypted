import React from "react";

const EvaluationStudentListItem = ({
  student,
  onGradeChange,
  initialGrade,
}) => {
  const handleSelectChange = (event) => {
    const grade = parseInt(event.target.value, 10);
    onGradeChange(student.id, grade);
  };

  return (
    <tr className="border-b">
      <td className="px-4 py-2">{student.firstName}</td>
      <td className="px-4 py-2">{student.lastName}</td>
      <td className="px-4 py-2">
        <select
          value={initialGrade || ""}
          onChange={handleSelectChange}
          className="w-20 px-2 py-1 border border-gray-300 rounded"
        >
          <option value="">Select grade</option>
          {[...Array(10)].map((_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
      </td>
    </tr>
  );
};

export default EvaluationStudentListItem;

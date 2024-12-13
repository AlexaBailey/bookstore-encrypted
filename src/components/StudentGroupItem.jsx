import React from "react";

const StudentGroupItem = ({ student }) => {
  return (
    <tr className="border-b">
      <td className="px-4 py-2">{student.firstName}</td>
      <td className="px-4 py-2">{student.lastName}</td>
    </tr>
  );
};

export default StudentGroupItem;

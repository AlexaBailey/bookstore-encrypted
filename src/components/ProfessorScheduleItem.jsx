import React from "react";

const ProfessorScheduleItem = ({ schedule }) => {
  return (
    <tr className="border-b">
      <td className="px-4 py-2">{schedule.subjectName}</td>
      <td className="px-4 py-2">{schedule.groupName}</td>
      <td className="px-4 py-2">{schedule.date}</td>
    </tr>
  );
};

export default ProfessorScheduleItem;

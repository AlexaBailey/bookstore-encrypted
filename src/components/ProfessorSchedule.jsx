import React from "react";
import ProfessorScheduleItem from "./ProfessorScheduleItem";

const ProfessorSchedule = ({ schedule }) => {
  if (!schedule || schedule.length === 0) {
    return <p className="text-gray-500">No schedule available.</p>;
  }

  return (
    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left">Subject</th>
          <th className="px-4 py-2 text-left">Group</th>
          <th className="px-4 py-2 text-left">Date</th>
        </tr>
      </thead>
      <tbody>
        {schedule.map((scheduleElement) => (
          <ProfessorScheduleItem
            key={scheduleElement.id}
            schedule={scheduleElement}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ProfessorSchedule;

import React from "react";
import EvaluationItem from "./EvaluationItem";
const EvaluationList = ({ evaluations }) => {
  if (!evaluations || evaluations.length === 0) {
    return <p className="text-gray-500">No evaluations available.</p>;
  }

  return (
    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-2 text-left">Subject Name</th>
          <th className="px-4 py-2 text-left">Form of Control</th>
          <th className="px-4 py-2 text-left">Date</th>
          <th className="px-4 py-2 text-left">Action</th>
          <th className="px-4 py-2 text-left">Download</th>
        </tr>
      </thead>
      <tbody>
        {evaluations.map((evaluation) => (
          <EvaluationItem key={evaluation.id} evaluation={evaluation} />
        ))}
      </tbody>
    </table>
  );
};

export default EvaluationList;

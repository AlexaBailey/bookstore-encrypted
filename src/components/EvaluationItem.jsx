import React from "react";
import { useDeleteEvaluationMutation } from "../store/slices/api/evaluationApi";
import { useParams } from "react-router-dom";

const EvaluationItem = ({ evaluation }) => {
  const { id } = useParams();
  const [deleteEvaluation] = useDeleteEvaluationMutation();

  const handleDelete = async (evaluationId) => {
    await deleteEvaluation({ professorId: id, evaluationId });
    window.location.reload();
  };

  return (
    <tr className="border-b">
      <td className="px-4 py-2">{evaluation.subjectName}</td>
      <td className="px-4 py-2">
        <a
          href={`/evaluation/${evaluation.id}`}
          className="text-yellow-800 underline"
        >
          {evaluation.formOfControl}
        </a>
      </td>
      <td className="px-4 py-2">{evaluation.date}</td>
      <td className="px-4 py-2">
        <button
          onClick={() => handleDelete(evaluation.id)}
          className="px-3 py-1 bg-myred text-white rounded hover:bg-transparent hover:text-myred hover:border-myred border-2"
        >
          Delete
        </button>
      </td>
      <td className="px-4 py-2">
        <a
          href={`http://localhost:5001/api/evaluation/${evaluation.id}/download`}
          className="text-yellow-800 underline"
        >
          Download
        </a>
      </td>
    </tr>
  );
};

export default EvaluationItem;

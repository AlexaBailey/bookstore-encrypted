import React from "react";
import { useDeleteProfessorSubjectMutation } from "../store/slices/api/professorApi";
import { toast } from "react-toastify";

const ProfessorSubjectItem = ({ subject }) => {
  const [deleteProfessorSubject] = useDeleteProfessorSubjectMutation();

  const handleDelete = async () => {
    await deleteProfessorSubject({
      id: subject.professorId,
      subjectId: subject.id,
    });
    toast.success("Subject deleted successfully.");
  };

  return (
    <tr className="border-b">
      <td className="px-4 py-2">{subject.subjectName}</td>
      <td className="px-4 py-2">
        <button
          onClick={handleDelete}
          className="px-3 py-1 bg-myred text-white rounded hover:bg-transparent hover:text-myred hover:border-myred border-2"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ProfessorSubjectItem;

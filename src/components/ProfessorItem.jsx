import React, { useState } from "react";
import { useDeleteProfessorMutation } from "../store/slices/api/professorApi";
import EditProfessor from "./modals/EditProfessor";
import { toast } from "react-toastify";

const ProfessorItem = ({ professor }) => {
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [deleteProfessor] = useDeleteProfessorMutation();

  const handleDelete = async () => {
    await deleteProfessor(professor.id);
    toast.success("Professor deleted successfully.");
  };

  return (
    <>
      <tr className="border-b">
        <td className="px-4 py-2">{professor.id}</td>
        <td className="px-4 py-2 text-blue-500">
          <a href={`/professors/${professor.id}`}>{professor.firstName}</a>
        </td>
        <td className="px-4 py-2">{professor.lastName}</td>
        <td className="px-4 py-2">{professor.dateOfBirth}</td>
        <td className="px-4 py-2">
          <button
            className="px-3 py-1 bg-blue-700 text-white rounded hover:bg-blue-800"
            onClick={() => setIsEditVisible(true)}
          >
            Edit
          </button>
        </td>
        <td className="px-4 py-2">
          <button
            className="px-3 py-1 bg-myred text-white rounded hover:bg-transparent hover:text-myred hover:border-myred border-2"
            onClick={handleDelete}
          >
            Delete
          </button>
        </td>
        <td className="px-4 py-2">
          <a
            href={`http://localhost:5001/api/professor/${professor.id}/download`}
            className="text-yellow-800 underline"
          >
            Download
          </a>
        </td>
      </tr>
      {isEditVisible && (
        <EditProfessor
          isOpen={isEditVisible}
          onClose={() => setIsEditVisible(false)}
          professor={professor}
        />
      )}
    </>
  );
};

export default ProfessorItem;

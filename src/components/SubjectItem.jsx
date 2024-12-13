import React, { useState } from "react";
import { useDeleteSubjectMutation } from "../store/slices/api/subjectsApi";
import { toast } from "react-toastify";

const SubjectItem = ({ subject }) => {
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [deleteSubject] = useDeleteSubjectMutation();

  const handleDelete = async () => {
    await deleteSubject(subject.id);
    toast.success("Subject deleted successfully.");
  };

  return (
    <>
      <tr className="border-b">
        <td className="px-4 py-2">{subject.id}</td>
        <td className="px-4 py-2">{subject.name}</td>
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
      </tr>
      {isEditVisible && (
        <EditSubjectModal
          isOpen={isEditVisible}
          onClose={() => setIsEditVisible(false)}
          subject={subject}
        />
      )}
    </>
  );
};

export default SubjectItem;

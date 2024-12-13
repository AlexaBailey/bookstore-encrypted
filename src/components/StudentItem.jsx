import React, { useState } from "react";
import { useDeleteStudentMutation } from "../store/slices/api/studentsApi";
import EditStudent from "./modals/EditStudent";
import { toast } from "react-toastify";

const StudentItem = ({ student }) => {
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [deleteStudent] = useDeleteStudentMutation();

  const handleDelete = async () => {
    await deleteStudent(student.id);
    toast.success("Student deleted successfully.");
  };

  return (
    <>
      <tr className="border-b">
        <td className="px-4 py-2">{student.id}</td>
        <td className="px-4 py-2">{student.firstName}</td>
        <td className="px-4 py-2">{student.lastName}</td>
        <td className="px-4 py-2">{student.groupName}</td>
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
            href={`http://localhost:5001/api/student/${student.id}/download`}
            className="text-yellow-800 underline"
          >
            Download
          </a>
        </td>
      </tr>
      {isEditVisible && (
        <EditStudent
          isOpen={isEditVisible}
          onClose={() => setIsEditVisible(false)}
          student={student}
        />
      )}
    </>
  );
};

export default StudentItem;

import React, { useState } from "react";
import { useDeleteGroupMutation } from "../store/slices/api/groupApi";
import EditGroup from "./modals/EditGroup";
import { toast } from "react-toastify";

const GroupItem = ({ group }) => {
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [deleteGroup] = useDeleteGroupMutation();

  const handleDelete = async () => {
    await deleteGroup(group.id);
    toast.success("Group deleted successfully.");
  };

  return (
    <>
      <tr className="border-b">
        <td className="px-4 py-2">{group.id}</td>
        <td className="px-4 py-2 text-blue-500">
          <a href={`/groups/${group.id}`}>{group.name}</a>
        </td>
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
            href={`http://localhost:5001/api/group/${group.id}/download`}
            className="text-yellow-800 underline"
          >
            Download
          </a>
        </td>
      </tr>
      {isEditVisible && (
        <EditGroup
          isOpen={isEditVisible}
          onClose={() => setIsEditVisible(false)}
          group={group}
        />
      )}
    </>
  );
};

export default GroupItem;

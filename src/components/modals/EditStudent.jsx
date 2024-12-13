import React, { useState } from "react";
import { useGetGroupsQuery } from "../../store/slices/api/groupApi";
import { Dialog, Transition } from "@headlessui/react";
import { useUpdateStudentMutation } from "../../store/slices/api/studentsApi";
import { toast } from "react-toastify";

const EditStudent = ({ isOpen, onClose, student }) => {
  const [firstName, setFirstName] = useState(student.firstName || "");
  const [lastName, setLastName] = useState(student.lastName || "");
  const [groupId, setGroupId] = useState(student.groupId || "");
  const { data: groups = [] } = useGetGroupsQuery();
  const [updateStudent] = useUpdateStudentMutation();

  const handleSave = async () => {
    if (!firstName.trim() || !lastName.trim() || !groupId) {
      toast.error("All fields are required.");
      return;
    }
    await updateStudent({ id: student.id, firstName, lastName, groupId });
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
            <Dialog.Title className="text-xl font-semibold">
              Edit Student
            </Dialog.Title>
            <div className="mt-4 space-y-3">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                className="w-full p-2 border rounded"
              />
              <select
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="" disabled>
                  Select group
                </option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4 flex justify-end gap-3">
              <button
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditStudent;

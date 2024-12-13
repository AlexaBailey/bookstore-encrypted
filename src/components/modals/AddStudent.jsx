import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useGetGroupsQuery } from "../../store/slices/api/groupApi";
import { useCreateStudentMutation } from "../../store/slices/api/studentsApi";
import { toast } from "react-toastify";

const AddStudent = ({ isOpen, onClose }) => {
  const { data: groups = [], isLoading } = useGetGroupsQuery();
  const [addStudent] = useCreateStudentMutation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");

  const handleAddStudent = async () => {
    if (!firstName.trim() || !lastName.trim() || !selectedGroup) {
      toast.error("All fields are required.");
      return;
    }
    await addStudent({ firstName, lastName, group: selectedGroup });
    setFirstName("");
    setLastName("");
    setSelectedGroup("");
    onClose();
  };

  if (isLoading) {
    return <p className="text-center">Loading groups...</p>;
  }

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
            <Dialog.Title className="text-xl font-semibold">
              Add New Student
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
                className="w-full p-2 border rounded"
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
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
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleAddStudent}
              >
                Add
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddStudent;

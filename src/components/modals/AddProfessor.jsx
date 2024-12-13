import React, { useState } from "react";
import { useCreateProfessorMutation } from "../../store/slices/api/professorApi";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-toastify";

const AddProfessor = ({ isOpen, onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [addProfessor] = useCreateProfessorMutation();

  const handleAddProfessor = async () => {
    if (!firstName || !lastName || !dateOfBirth) {
      toast.error("All fields are required.");
      return;
    }
    await addProfessor({ firstName, lastName, dateOfBirth });
    setFirstName("");
    setLastName("");
    setDateOfBirth("");
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
            <Dialog.Title className="text-xl font-semibold">
              Add New Professor
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
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full p-2 border rounded"
              />
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
                onClick={handleAddProfessor}
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

export default AddProfessor;

import React, { useState } from "react";
import { useAddSubjectMutation } from "../../store/slices/api/subjectsApi";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-toastify";

const AddSubject = ({ isOpen, onClose }) => {
  const [subjectName, setSubjectName] = useState("");
  const [addSubject] = useAddSubjectMutation();

  const handleAddSubject = async () => {
    if (subjectName.trim() === "") {
      toast.error("Subject name cannot be empty.");
      return;
    }
    await addSubject({ name: subjectName });
    setSubjectName("");
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
            <Dialog.Title className="text-xl font-semibold">
              Add New Subject
            </Dialog.Title>
            <div className="mt-4">
              <input
                type="text"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                placeholder="Subject name"
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
                onClick={handleAddSubject}
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

export default AddSubject;
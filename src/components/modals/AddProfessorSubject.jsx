import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useGetSubjectsQuery } from "../../store/slices/api/subjectsApi";
import { useAddProfessorSubjectMutation } from "../../store/slices/api/professorApi";
const AddProfessorSubject = ({
  isOpen,
  onClose,
  professorSubjects,
  professorId,
}) => {
  const { data: subjects = [], isLoading } = useGetSubjectsQuery();
  const [addProfessorSubject] = useAddProfessorSubjectMutation();
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen && subjects.length > 0) {
      const availableSubjects = subjects.filter(
        (sub) => !professorSubjects.some((ps) => ps.id === sub.id)
      );
      setFilteredSubjects(availableSubjects);
    }
  }, [isOpen, subjects, professorSubjects]);

  const handleAddSubject = async () => {
    if (!selectedSubject) {
      setError("Please select a subject before adding.");
      return;
    }
    await addProfessorSubject({ professorId, subjectId: selectedSubject });
    setSelectedSubject("");
    onClose();
  };

  if (isLoading) {
    return <p className="text-center">Loading subjects...</p>;
  }

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
            <Dialog.Title className="text-xl font-semibold">
              Add Subject for Professor
            </Dialog.Title>
            <div className="mt-4">
              {error && <p className="text-myred">{error}</p>}
              <select
                className="w-full p-2 border rounded"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="" disabled>
                  Select subject
                </option>
                {filteredSubjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
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

export default AddProfessorSubject;

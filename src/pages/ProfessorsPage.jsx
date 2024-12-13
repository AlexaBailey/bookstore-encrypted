import React, { useState } from "react";
import { useGetProfessorsQuery } from "../store/slices/api/professorApi";
import ProfessorList from "../components/ProfessorList";
import AddProfessor from "../components/modals/AddProfessor";

const ProfessorsPage = () => {
  const { data: professors = [], isLoading } = useGetProfessorsQuery();
  const [isAddProfessorVisible, setIsAddProfessorVisible] = useState(false);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-4">
        Professors Management
      </h2>
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <ProfessorList professors={professors} />
      )}
      <div className="text-center mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setIsAddProfessorVisible(true)}
        >
          Add Professor
        </button>
      </div>
      {isAddProfessorVisible && (
        <AddProfessor
          isOpen={isAddProfessorVisible}
          onClose={() => setIsAddProfessorVisible(false)}
        />
      )}
    </div>
  );
};

export default ProfessorsPage;

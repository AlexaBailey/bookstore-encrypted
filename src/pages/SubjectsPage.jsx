import React, { useState } from "react";
import { useGetSubjectsQuery } from "../store/slices/api/subjectsApi";
import SubjectList from "../components/SubjectList";
import AddSubject from "../components/modals/AddSubject";

const SubjectsPage = () => {
  const { data: subjects = [], isLoading } = useGetSubjectsQuery();
  const [isAddSubjectVisible, setIsAddSubjectVisible] = useState(false);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-4">
        Subjects Management
      </h2>
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <SubjectList subjects={subjects} />
      )}
      <div className="text-center mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setIsAddSubjectVisible(true)}
        >
          Add Subject
        </button>
      </div>
      {isAddSubjectVisible && (
        <AddSubject
          isOpen={isAddSubjectVisible}
          onClose={() => setIsAddSubjectVisible(false)}
        />
      )}
    </div>
  );
};

export default SubjectsPage;

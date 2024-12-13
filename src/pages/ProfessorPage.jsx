import React, { useState } from "react";
import { useGetProfessorByIdQuery } from "../store/slices/api/professorApi";
import { useParams } from "react-router-dom";
import ProfessorSubjectList from "../components/ProfessorSubjectList";
import ProfessorSchedule from "../components/ProfessorSchedule";
import EvaluationList from "../components/EvaluationList";
import AddProfessorSubject from "../components/modals/AddProfessorSubject";

const ProfessorPage = () => {
  const { id } = useParams();
  const { data: professor, isLoading } = useGetProfessorByIdQuery(id);
  const [isAddSubjectVisible, setIsAddSubjectVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("subjects");

  if (isLoading || !professor) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-4">
        Professor Information
      </h2>
      <p>
        <strong>First Name:</strong> {professor.firstName}
      </p>
      <p>
        <strong>Last Name:</strong> {professor.lastName}
      </p>
      <div className="mt-6">
        <ul className="flex space-x-4 border-b">
          <li>
            <button
              className={`px-4 py-2 ${
                activeTab === "subjects"
                  ? "text-blue-700 font-bold"
                  : "text-blue-500"
              }`}
              onClick={() => setActiveTab("subjects")}
            >
              Subjects
            </button>
          </li>
          <li>
            <button
              className={`px-4 py-2 ${
                activeTab === "schedule"
                  ? "text-blue-700 font-bold"
                  : "text-blue-500"
              }`}
              onClick={() => setActiveTab("schedule")}
            >
              Schedule
            </button>
          </li>
          <li>
            <button
              className={`px-4 py-2 ${
                activeTab === "evaluation"
                  ? "text-blue-700 font-bold"
                  : "text-blue-500"
              }`}
              onClick={() => setActiveTab("evaluation")}
            >
              Evaluation
            </button>
          </li>
        </ul>
        {activeTab === "subjects" && (
          <>
            <ProfessorSubjectList subjects={professor.subjects} />
            <div className="text-center mt-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => setIsAddSubjectVisible(true)}
              >
                Add Subject
              </button>
            </div>
            {isAddSubjectVisible && (
              <AddProfessorSubject
                isOpen={isAddSubjectVisible}
                onClose={() => setIsAddSubjectVisible(false)}
                professorSubjects={professor.subjects}
                professorId={id}
              />
            )}
          </>
        )}
        {activeTab === "schedule" && (
          <ProfessorSchedule schedule={professor.schedule} />
        )}
        {activeTab === "evaluation" && (
          <EvaluationList evaluations={professor.evaluation} />
        )}
      </div>
    </div>
  );
};

export default ProfessorPage;

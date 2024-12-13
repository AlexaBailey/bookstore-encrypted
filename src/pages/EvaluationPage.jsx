import React, { useEffect, useState } from "react";
import {
  useGetEvaluationByIdQuery,
  useSaveEvaluationResultsMutation,
} from "../store/slices/api/evaluationApi";
import { useNavigate, useParams } from "react-router-dom";
import EvaluationStudentList from "../components/EvaluationStudentList";

const EvaluationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: evaluation, isLoading } = useGetEvaluationByIdQuery(id);
  const [saveEvaluationResults] = useSaveEvaluationResultsMutation();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (evaluation) {
      const initialData = {};
      evaluation.students.forEach((student) => {
        initialData[student.id] = student.mark || null;
      });
      setFormData(initialData);
    }
  }, [evaluation]);

  const handleGradeChange = (studentId, grade) => {
    setFormData((prevState) => ({
      ...prevState,
      [studentId]: grade,
    }));
  };

  const handleSubmit = async () => {
    await saveEvaluationResults({ id, results: formData });
    navigate(`/professors/${evaluation.professorId}`);
  };

  if (isLoading || !evaluation) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 uppercase">
        {evaluation.formOfControl} Document
      </h1>
      <div className="mb-4 space-y-2">
        <p>
          <strong>Date:</strong> {evaluation.date}
        </p>
        <p>
          <strong>Professor:</strong> {evaluation.professorFirstName}{" "}
          {evaluation.professorLastName}
        </p>
        <p>
          <strong>Subject:</strong> {evaluation.subjectName}
        </p>
        <p>
          <strong>Hours:</strong> {evaluation.hours}
        </p>
        <p>
          <strong>Group:</strong> {evaluation.groupName}
        </p>
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <tbody>
          <EvaluationStudentList
            students={evaluation.students}
            onGradeChange={handleGradeChange}
            initialGrades={formData}
          />
        </tbody>
      </table>
      <div className="text-right mt-4">
        <button
          className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default EvaluationPage;

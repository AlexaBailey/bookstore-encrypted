import React, { useState } from "react";
import { useGetStudentsQuery } from "../store/slices/api/studentsApi";
import StudentList from "../components/StudentList";
import AddStudent from "../components/modals/AddStudent";

const StudentsPage = () => {
  const { data: students = [], isLoading } = useGetStudentsQuery();
  const [isAddStudentVisible, setIsAddStudentVisible] = useState(false);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-4">
        Students Management
      </h2>
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <StudentList students={students} />
      )}
      <div className="text-center mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setIsAddStudentVisible(true)}
        >
          Add Student
        </button>
      </div>
      {isAddStudentVisible && (
        <AddStudent
          isOpen={isAddStudentVisible}
          onClose={() => setIsAddStudentVisible(false)}
        />
      )}
    </div>
  );
};

export default StudentsPage;

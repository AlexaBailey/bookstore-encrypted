import React from "react";
import { useGetGroupQuery } from "../store/slices/api/groupApi";
import { useParams } from "react-router-dom";
import StudentGroupList from "../components/StudentGroupList";

const GroupPage = () => {
  const { id } = useParams();
  const { data: group, isLoading } = useGetGroupQuery(id);

  if (isLoading || !group) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-center mb-4">
        Student List of Group: <strong>{group.name}</strong>
      </h2>
      <StudentGroupList students={group.students} />
    </div>
  );
};

export default GroupPage;

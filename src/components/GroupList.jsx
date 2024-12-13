import React from "react";
import { useGetGroupsQuery } from "../store/slices/api/groupApi";
import GroupItem from "./GroupItem";

const GroupList = () => {
  const { data: groups = [], isLoading } = useGetGroupsQuery();

  if (isLoading) return <p>Loading...</p>;

  return (
    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left">ID</th>
          <th className="px-4 py-2 text-left">Name</th>
          <th className="px-4 py-2 text-left">Edit</th>
          <th className="px-4 py-2 text-left">Delete</th>
          <th className="px-4 py-2 text-left">Download</th>
        </tr>
      </thead>
      <tbody>
        {groups.map((group) => (
          <GroupItem key={group.id} group={group} />
        ))}
      </tbody>
    </table>
  );
};

export default GroupList;

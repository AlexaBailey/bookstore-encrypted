import React, { useState } from "react";
import { useGetGroupsQuery } from "../store/slices/api/groupApi";
import GroupList from "../components/GroupList";
import AddGroup from "../components/modals/AddGroup";

const GroupsPage = () => {
  const { data: groups = [], isLoading } = useGetGroupsQuery();
  const [isAddGroupVisible, setIsAddGroupVisible] = useState(false);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Group Management</h2>
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <GroupList groups={groups} />
      )}
      <div className="text-center mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setIsAddGroupVisible(true)}
        >
          Add Group
        </button>
      </div>
      {isAddGroupVisible && (
        <AddGroup
          isOpen={isAddGroupVisible}
          onClose={() => setIsAddGroupVisible(false)}
        />
      )}
    </div>
  );
};

export default GroupsPage;

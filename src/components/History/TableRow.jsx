import React, { useState } from "react";
import ViewRecord from "./ViewRecord";
import { MdFileDownload } from "react-icons/md";
import { useLazyDownloadBorrowedBookRecordQuery } from "../../store/slices/api/booksApi";
export default function TableRow({ record, refetch }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [triggerDownloadBorrowedBookRecord] =
    useLazyDownloadBorrowedBookRecordQuery();

  const download = async () => {
    try {
      const blob = await triggerDownloadBorrowedBookRecord(record.id).unwrap(); // Trigger the query and unwrap the result
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `borrowed_book_record_${record.id}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the record:", error.message);
    }
  };
  return (
    <>
      {" "}
      <tr
        key={record.id}
        className={`hover:bg-gray-100 cursor-pointer border-l-4  ${
          !record.return_date && "border-l-red-600"
        }`}
        onDoubleClick={() => setSelectedRecord(record) || setIsDialogOpen(true)}
      >
        <td className="p-4">{record.visitor.name}</td>
        <td className="p-4">{record.book?.title}</td>
        <td className="p-4">
          {record.librarian.name} {record.librarian.surname}
        </td>
        <td className="p-4">{record.borrow_date}</td>
        <td className="p-4">
          {record.return_date
            ? record.return_date.split("T")[0]
            : "Not Returned"}
        </td>
        <td className="p-4">
          <MdFileDownload onClick={download} />
        </td>
      </tr>
      <ViewRecord
        refetch={refetch}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        selectedRecord={selectedRecord}
      />
    </>
  );
}

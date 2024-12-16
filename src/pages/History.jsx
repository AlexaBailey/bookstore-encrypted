import React, { useMemo, useState } from "react";
import {
  useFetchBorrowedBooksQuery,
  useLazyDownloadBorrowedBooksArchiveQuery,
  useLazyFetchUserBorrowHistoryQuery,
} from "../store/slices/api/booksApi";
import _ from "lodash";
import AddRecordDialog from "../components/History/AddRecord";
import SearchBar from "../components/History/SearchBar";
import TableRow from "../components/History/TableRow";

const HistoryPage = () => {
  const { data: borrowedBooks = [], refetch } = useFetchBorrowedBooksQuery();
  const [userBorrowHistoryQuery, setUserBorrowHistoryQuery] = useState("");
  const [triggerDownloadBorrowedBooksArchive] =
    useLazyDownloadBorrowedBooksArchiveQuery();

  const sortedBorrowedBooks = useMemo(
    () =>
      _.sortBy([...borrowedBooks], [(o) => new Date(o.borrowDate)]).reverse(),
    [borrowedBooks]
  );
  const [triggerUserBorrowHistory, { data: userBorrowHistory = [] }] =
    useLazyFetchUserBorrowHistoryQuery();

  const sortedUserBorrowHistory = useMemo(
    () =>
      _.sortBy(
        [...userBorrowHistory],
        [(o) => new Date(o.borrowDate)]
      ).reverse(),
    [userBorrowHistory]
  );

  const handleDownloadArchive = async () => {
    try {
      const blob = await triggerDownloadBorrowedBooksArchive().unwrap();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "borrowed_books_archive.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading archive:", error.message);
    }
  };

  const tableData = !userBorrowHistoryQuery
    ? sortedBorrowedBooks
    : userBorrowHistoryQuery.length > 0
      ? sortedUserBorrowHistory
      : sortedBorrowedBooks;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Borrow History</h1>
      <div className="mb-4 flex items-center gap-4">
        <AddRecordDialog refetch={refetch} />
        <SearchBar
          userBorrowHistoryQuery={userBorrowHistoryQuery}
          setUserBorrowHistoryQuery={setUserBorrowHistoryQuery}
          triggerUserBorrowHistory={triggerUserBorrowHistory}
        />
        <button
          onClick={handleDownloadArchive}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Download Archive
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="p-4 text-left">Visitor</th>
              <th className="p-4 text-left">Book</th>
              <th className="p-4 text-left">Librarian</th>
              <th className="p-4 text-left">Borrow Date</th>
              <th className="p-4 text-left">Return Date</th>
              <th className="p-4 text-left">Download</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((record) => (
              <TableRow refetch={refetch} record={record} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryPage;

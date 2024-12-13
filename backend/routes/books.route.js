import express from "express";
import {
  getBooks,
  borrowBook,
  returnBook,
  getCurrentBorrowedBooks,
  getAllBorrowedBooks,
  getVisitorBorrowHistory,
  downloadBorrowedBookRecord,
  downloadBorrowedBooksArchive,
} from "../controllers/books.encrypt.controller.js";

const router = express.Router();

router.get("/", getBooks);
router.post("/borrow", borrowBook);
router.post("/return", returnBook);
router.get("/current-borrowed", getCurrentBorrowedBooks);
router.get("/borrow-history/:name", getVisitorBorrowHistory);
router.get("/borrowed-books", getAllBorrowedBooks);
router.get("/download/:recordId", downloadBorrowedBookRecord);
router.get("/archive", downloadBorrowedBooksArchive);

export default router;

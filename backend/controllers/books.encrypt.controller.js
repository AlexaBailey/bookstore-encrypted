import { readTxtAsJson } from "../helpers/convert.js";
import Link from "../helpers/Link.class.js";
import {
  decryptFileAndValidate,
  saveAndEncryptData,
} from "../helpers/encrypt.js";
import { ENCRYPTION_KEY } from "../constants.js";
import archiver from "archiver";

export const getBooks = async (req, res) => {
  const { limit = 10, page = 0, category, query = "" } = req.query;

  try {
    const decrypted = await decryptFileAndValidate(
      "book_category.txt",
      ENCRYPTION_KEY
    );
    let bookCategories = await readTxtAsJson(decrypted);

    const booksWithCategories = await Promise.all(
      bookCategories.map(async (entry) => {
        const book = await new Link(entry.book_id).resolveLink();
        const category = await new Link(entry.category_id).resolveLink();

        return {
          ...book,
          categories: [category.name],
        };
      })
    );

    let filteredBooks = booksWithCategories;

    if (category && category !== "All") {
      filteredBooks = filteredBooks.filter((book) =>
        book.categories.includes(category)
      );
    }

    if (query) {
      filteredBooks = filteredBooks.filter(
        (book) =>
          typeof book.title === "string" &&
          book.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    const startIndex = page * limit;
    const paginatedBooks = filteredBooks.slice(
      startIndex,
      startIndex + parseInt(limit, 10)
    );

    res.status(200).json({
      books: paginatedBooks,
      total: filteredBooks.length,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Error fetching books" });
  }
};

export const getAllBorrowedBooks = async (req, res) => {
  try {
    const decrypted = await decryptFileAndValidate(
      "borrowed_books.txt",
      ENCRYPTION_KEY
    );
    const borrowedBooks = await readTxtAsJson(decrypted);

    const allBorrowedBooks = await Promise.all(
      borrowedBooks.map(async (record) => ({
        ...record,
        book: await new Link(record.book).resolveLink(),
        visitor: await new Link(record.visitor).resolveLink(),
        librarian: await new Link(record.librarian).resolveLink(),
      }))
    );

    res.json(allBorrowedBooks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all borrowed books" });
  }
};

export const borrowBook = async (req, res) => {
  const {
    visitors: { visitorId, tableName: visitorTableName },
    book: { bookId, tableName: bookTableName },
    librarian: { librarianId, tableName: librarianTableName } = {},
    borrow_date,
  } = req.body;

  try {
    if (!visitorId || !bookId || !librarianId || !borrow_date) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const visitorLink = await Link.formatLinkById(visitorTableName, visitorId);
    const bookLink = await Link.formatLinkById(bookTableName, bookId);
    const librarianLink = await Link.formatLinkById(
      librarianTableName,
      librarianId
    );
    const decrypted = await decryptFileAndValidate(
      "book_category.txt",
      ENCRYPTION_KEY
    );
    const bookCategories = await readTxtAsJson(decrypted);

    const categoryLinks = bookCategories
      .filter((bc) => bc.book_id === bookLink)
      .map((bc) => bc.category_id);

    const categories = await Promise.all(
      categoryLinks.map(async (categoryLink) => {
        const category = await new Link(categoryLink).resolveLink();
        return category.name;
      })
    );

    const librarian = await new Link(librarianLink).resolveLink();

    if (!categories.includes(librarian.section)) {
      return res.status(400).json({
        message: `Librarian's section (${librarian.section}) does not match the book's category (${categories.join(
          ", "
        )}).`,
      });
    }

    const decryptedSchedules = await decryptFileAndValidate(
      "librarian_schedule.txt",
      ENCRYPTION_KEY
    );
    const librarianSchedules = await readTxtAsJson(decryptedSchedules);

    const librarianScheduleEntry = librarianSchedules.find(
      (ls) => ls.librarianId === librarianLink
    );

    if (!librarianScheduleEntry) {
      return res.status(400).json({ message: "Librarian schedule not found." });
    }

    const borrowDay = new Date(borrow_date).toLocaleString("en-US", {
      weekday: "long",
    });

    if (!librarianScheduleEntry?.schedule.includes(borrowDay)) {
      return res.status(400).json({
        message: `Librarian is not scheduled to work on ${borrowDay}.`,
      });
    }
    const decryptedborrowedBooks = await decryptFileAndValidate(
      "borrowed_books.txt",
      ENCRYPTION_KEY
    );
    const borrowedBooks = await readTxtAsJson(decryptedborrowedBooks);

    if (
      borrowedBooks.some(
        (record) => record.book === bookLink && !record.return_date
      )
    ) {
      return res.status(400).json({ message: "Book is already borrowed." });
    }

    borrowedBooks.push({
      id: borrowedBooks.length + 1,
      visitor: visitorLink,
      book: bookLink,
      librarian: librarianLink,
      borrow_date,
      return_date: null,
    });

    await saveAndEncryptData(
      "borrowed_books.txt",
      borrowedBooks,
      ENCRYPTION_KEY
    );

    res.status(201).json({ message: "Book borrowed successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error borrowing book.", error: error.message });
  }
};

export const returnBook = async (req, res) => {
  const { recordId, returnDate } = req.body;

  try {
    const decryptedborrowedBooks = await decryptFileAndValidate(
      "borrowed_books.txt",
      ENCRYPTION_KEY
    );
    const borrowedBooks = await readTxtAsJson(decryptedborrowedBooks);

    const record = borrowedBooks.find((entry) => entry.id === recordId);
    if (!record) {
      return res.status(404).json({ message: "Borrow record not found." });
    }

    record.return_date = returnDate;

    await saveAndEncryptData(
      "borrowed_books.txt",
      borrowedBooks,
      ENCRYPTION_KEY
    );

    res.status(200).json({ message: "Book returned successfully.", record });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error returning book.", error: error.message });
  }
};

export const getCurrentBorrowedBooks = async (req, res) => {
  try {
    const decryptedborrowedBooks = await decryptFileAndValidate(
      "borrowed_books.txt",
      ENCRYPTION_KEY
    );
    const borrowedBooks = await readTxtAsJson(decryptedborrowedBooks);

    const currentBorrowed = await Promise.all(
      borrowedBooks
        .filter((record) => !record.return_date)
        .map(async (record) => ({
          ...record,
          book: await new Link(record.book).resolveLink(),
          visitor: await new Link(record.visitor).resolveLink(),
          librarian: await new Link(record.librarian).resolveLink(),
        }))
    );

    res.json(currentBorrowed);
  } catch (error) {
    res.status(500).json({ message: "Error fetching current borrowed books" });
  }
};

import { PassThrough } from "stream";
import { createGzip } from "zlib";

export const downloadBorrowedBooksArchive = async (req, res) => {
  try {
    const decryptedBorrowedBooks = await decryptFileAndValidate(
      "borrowed_books.txt",
      ENCRYPTION_KEY
    );
    const borrowedBooks = await readTxtAsJson(decryptedBorrowedBooks);

    // Set headers for ZIP file download
    res.setHeader("Content-Type", "application/zip");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="borrowed_books_archive.zip"'
    );

    const archive = archiver("zip", { zlib: { level: 9 } }); // Use maximum compression
    archive.pipe(res); // Stream ZIP file to response

    // Add a file per record
    for (const record of borrowedBooks) {
      const book = await new Link(record.book).resolveLink();
      const visitor = await new Link(record.visitor).resolveLink();
      const librarian = await new Link(record.librarian).resolveLink();

      const recordDetails = {
        RecordID: record.id,
        BookTitle: book.title,
        BookAuthor: book.author,
        VisitorName: visitor.name,
        LibrarianName: librarian.name,
        BorrowDate: record.borrow_date,
        ReturnDate: record.return_date || "Not returned yet",
      };

      const fileContent = Object.entries(recordDetails)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n");

      // Append file to the archive
      archive.append(fileContent, { name: `borrowed_book_${record.id}.txt` });
    }

    // Finalize the ZIP archive
    await archive.finalize();
  } catch (error) {
    console.error("Error generating ZIP archive:", error);
    res
      .status(500)
      .json({ message: "Error generating ZIP archive.", error: error.message });
  }
};

export const downloadBorrowedBookRecord = async (req, res) => {
  const { recordId } = req.params;
  console.log(recordId);

  try {
    const decryptedBorrowedBooks = await decryptFileAndValidate(
      "borrowed_books.txt",
      ENCRYPTION_KEY
    );
    const borrowedBooks = await readTxtAsJson(decryptedBorrowedBooks);

    const record = borrowedBooks.find((entry) => entry.id === recordId);

    if (!record) {
      return res.status(404).json({ message: "Borrow record not found." });
    }

    const book = await new Link(record.book).resolveLink();
    const visitor = await new Link(record.visitor).resolveLink();
    const librarian = await new Link(record.librarian).resolveLink();

    const recordDetails = {
      RecordID: record.id,
      BookTitle: book.title,
      BookAuthor: book.author,
      VisitorName: visitor.name,
      LibrarianName: librarian.name,
      BorrowDate: record.borrow_date,
      ReturnDate: record.return_date || "Not returned yet",
    };

    const fileContent = Object.entries(recordDetails)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\r\n");

    res.setHeader("Content-Type", "text/plain");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="borrowed_book_record_${recordId}.txt"`
    );
    res.status(200).send(fileContent);
  } catch (error) {
    console.error("Error generating file:", error);
    res
      .status(500)
      .json({ message: "Error generating file.", error: error.message });
  }
};

export const getVisitorBorrowHistory = async (req, res) => {
  const { name } = req.params;

  try {
    const decryptedVisitors = await decryptFileAndValidate(
      "visitors.txt",
      ENCRYPTION_KEY
    );
    const visitors = await readTxtAsJson(decryptedVisitors);
    const visitor = visitors.find((v) => v.name == name);
    const visitorLink = await Link.formatLinkById("visitors", visitor.id);
    const decryptedborrowedBooks = await decryptFileAndValidate(
      "borrowed_books.txt",
      ENCRYPTION_KEY
    );
    const borrowedBooks = await readTxtAsJson(decryptedborrowedBooks);

    const visitorHistory = await Promise.all(
      borrowedBooks.map(async (record) => {
        if (record.visitor !== visitorLink) return null;

        const book = await new Link(record.book).resolveLink();
        const librarian = await new Link(record.librarian).resolveLink();

        return {
          ...record,
          visitor,
          book,
          librarian,
        };
      })
    );

    const filteredHistory = visitorHistory.filter((record) => record !== null);

    res.json(filteredHistory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching visitor borrow history." });
  }
};

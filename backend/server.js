import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {
  lzssCompress,
  lzssDecompress,
  offsetCipherEncrypt,
  offsetCipherDecrypt,
} from "./helpers/encrypt.js";
import routes from "./routes/index.js";
import fs from "fs/promises";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(bodyParser.json());

// const ENCRYPTION_KEY = 5;
// const filesToProcess = [
//   "book_category.txt",
//   "books.txt",
//   "borrowed_books.txt",
//   "categories.txt",
//   "librarian_schedule.txt",
//   "librarians.txt",
//   "users.txt",
//   "visitors.txt",
// ];

// const encryptFile = async (filename, key) => {
//   try {
//     console.log(`Encrypting file: ${filename}`);

//     const plainData = await fs.readFile(`./data/${filename}`, "utf-8");

//     const compressedData = lzssCompress(plainData);

//     const encryptedData = offsetCipherEncrypt(
//       JSON.stringify(compressedData),
//       key
//     );

//     await fs.writeFile(`./data/${filename}`, encryptedData, "utf-8");

//     console.log(`File encrypted successfully: ${filename}`);
//   } catch (error) {
//     console.error(`Error encrypting file ${filename}:`, error.message);
//   }
// };

// const decryptFileAndValidate = async (filename, key) => {
//   try {
//     console.log(`Decrypting and validating file: ${filename}`);
//     const encryptedData = await fs.readFile(`./data/${filename}`, "utf-8");
//     const compressedData = JSON.parse(offsetCipherDecrypt(encryptedData, key));
//     const plainData = lzssDecompress(compressedData);
//     await fs.writeFile(`./data/${filename}`, plainData, "utf-8");
//     try {
//       const jsonData = JSON.parse(plainData);
//       console.log(`File ${filename} decrypted and validated successfully.`);
//       console.log("Decrypted JSON data:", jsonData);
//     } catch {
//       console.log(`File ${filename} is not a JSON file. Content:`, plainData);
//     }

//     return true;
//   } catch (error) {
//     console.error(`Error decrypting file ${filename}:`, error.message);
//     return false;
//   }
// };
// const encryptAllFiles = async () => {
//   for (const file of filesToProcess) {
//     await encryptFile(file, ENCRYPTION_KEY);
//   }
// };

// const decryptAndValidateAllFiles = async () => {
//   for (const file of filesToProcess) {
//     const isValid = await decryptFileAndValidate(file, ENCRYPTION_KEY);
//     if (!isValid) {
//       console.log(`File ${file} failed validation.`);
//     }
//   }
// };

// (async () => {
//   console.log("Starting encryption...");
//   await encryptAllFiles();

// console.log("\nStarting decryption and validation...");
// await decryptAndValidateAllFiles();

//   console.log("\nProcess completed.");
// })();

app.use("/books", routes.booksRoutes);
app.use("/categories", routes.categoriesRoutes);
app.use("/visitors", routes.visitorsRoutes);
app.use("/librarians", routes.librariansRoute);
app.use("/auth", routes.authRoute);

app.get("/", (req, res) => {
  res.send("Welcome to the Bookstore API");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { readTxtAsJson } from "../helpers/convert.js";
import Link from "../helpers/Link.class.js";
import {
  decryptFileAndValidate,
  saveAndEncryptData,
} from "../helpers/encrypt.js";
import { ENCRYPTION_KEY } from "../constants.js";

dotenv.config();

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10;
const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const registerLibrarian = async (req, res) => {
  const { username, password, name, surname, schedule, experience, section } =
    req.body;

  try {
    if (
      !username ||
      !password ||
      !name ||
      !surname ||
      !schedule ||
      !experience ||
      !section
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const decryptedUsers = await decryptFileAndValidate(
      "users.txt",
      ENCRYPTION_KEY
    );
    const users = await readTxtAsJson(decryptedUsers);

    const decryptedLibrarians = await decryptFileAndValidate(
      "librarians.txt",
      ENCRYPTION_KEY
    );
    const librarians = await readTxtAsJson(decryptedLibrarians);

    if (users.some((user) => user.username === username)) {
      return res.status(400).json({ message: "Username already exists." });
    }

    const newUserId = users.length + 1;
    const newUser = {
      rowNumber: newUserId,
      id: newUserId,
      username,
      password: hashedPassword,
    };

    users.push(newUser);
    await saveAndEncryptData("users.txt", users, 5);

    const newLibrarianId = librarians.length + 1;
    const newLibrarian = {
      rowNumber: newLibrarianId,
      id: newLibrarianId,
      name,
      surname,
      section,
      experience,
      userId: Link.formatLink("users", newUserId),
    };

    librarians.push(newLibrarian);

    await saveAndEncryptData("librarians.txt", librarians, 5);

    const decryptedSchedule = await decryptFileAndValidate(
      "librarian_schedule.txt",
      ENCRYPTION_KEY
    );
    const librarianSchedules = await readTxtAsJson(decryptedSchedule);

    const newSchedule = {
      librarianId: Link.formatLink("librarians", newLibrarianId),
      schedule: Array.isArray(schedule) ? schedule.join("|") : schedule,
    };

    librarianSchedules.push(newSchedule);
    await saveAndEncryptData(
      "librarian_schedule.txt",
      librarianSchedules,
      ENCRYPTION_KEY
    );

    res.status(201).json({ message: "Librarian registered successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering librarian." });
  }
};

export const loginLibrarian = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }
    const decryptedUsers = await decryptFileAndValidate(
      "users.txt",
      ENCRYPTION_KEY
    );
    const users = await readTxtAsJson(decryptedUsers);

    const userRow = users.find((user) => user.username === username);

    if (!userRow) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    const user = await Link.formatLinkById("users", userRow.id);
    const isPasswordValid = await bcrypt.compare(password, userRow.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password." });
    }
    const decryptedLibrarians = await decryptFileAndValidate(
      "librarians.txt",
      ENCRYPTION_KEY
    );
    const librarians = await readTxtAsJson(decryptedLibrarians);
    const librarianRow = librarians.find((l) => l.userId === user);

    if (!librarianRow) {
      return res.status(404).json({ message: "Librarian details not found." });
    }
    const token = jwt.sign(
      {
        user: {
          id: librarianRow.id,
          userId: user,
          rowNumber: librarianRow.rowNumber,
        },
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful.",
      token,
      librarian: {
        id: librarianRow.id,
        rowNumber: librarianRow.rowNumber,
        name: librarianRow.name,
        surname: librarianRow.surname,
        section: librarianRow.section,
        experience: librarianRow.experience,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in." });
  }
};

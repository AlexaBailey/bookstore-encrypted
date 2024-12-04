import { readTxtAsJson } from "../helpers/convert.js";
import { decryptFileAndValidate } from "../helpers/encrypt.js";
import { ENCRYPTION_KEY } from "../constants.js";

export const getEmployees = async (req, res) => {
  try {
    const decryptedEmployees = await decryptFileAndValidate(
      "librarians.txt",
      ENCRYPTION_KEY
    );
    const employees = await readTxtAsJson(decryptedEmployees);
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees" });
  }
};

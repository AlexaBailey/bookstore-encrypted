import { readTxtAsJson } from "../helpers/convert.js";
import { decryptFileAndValidate } from "../helpers/encrypt.js";
import { ENCRYPTION_KEY } from "../constants.js";

export const getCategories = async (req, res) => {
  try {
    const decryptedCategories = await decryptFileAndValidate(
      "categories.txt",
      ENCRYPTION_KEY
    );
    const categories = await readTxtAsJson(decryptedCategories);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories" });
  }
};

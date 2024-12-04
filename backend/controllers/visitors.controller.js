import { readTxtAsJson } from "../helpers/convert.js";
import { decryptFileAndValidate } from "../helpers/encrypt.js";
import { ENCRYPTION_KEY } from "../constants.js";

export const getVisitors = async (req, res) => {
  const { query } = req.query;
  try {
    const decryptedVisitors = await decryptFileAndValidate(
      "visitors.txt",
      ENCRYPTION_KEY
    );
    const visitors = await readTxtAsJson(decryptedVisitors);

    const filteredVisitors = query
      ? visitors.filter((visitor) =>
          visitor.name.toLowerCase().includes(query.toLowerCase())
        )
      : visitors;
    res.json(filteredVisitors);
  } catch (error) {
    console.error("Error fetching visitors:", error);
    res.status(500).json({ message: "Error fetching visitors" });
  }
};

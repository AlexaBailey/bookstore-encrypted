import fs from "fs/promises";

export const convertJsonToTxt = (data) => {
  const keys = Object.keys(data[0]);
  const rows = data
    .map((item) =>
      keys
        .map((key) =>
          key === "schedule" && Array.isArray(item[key])
            ? item[key].join("|")
            : item[key]
        )
        .join(",")
    )
    .join("\n");

  const plainData = `${keys.join(",")}\n${rows}`;
  return plainData;
};

export const readTxtAsJson = async (data) => {
  try {
    const lines = data.trim().split("\n");
    const headers = lines[0].split(",");

    return lines.slice(1).map((line) => {
      const values = line.split(",");
      const obj = {};

      headers.forEach((key, index) => {
        obj[key] =
          key === "schedule" && values[index]?.includes("|")
            ? values[index].split("|")
            : values[index];
      });

      return obj;
    });
  } catch (error) {
    console.error(`Error reading `, error);
    return [];
  }
};

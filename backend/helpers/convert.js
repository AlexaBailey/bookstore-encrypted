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

// export const readTxtFileAsJson = async (filename) => {
//   try {
//     const data = await fs.readFile(`./data/${filename}`, "utf-8");
//     const lines = data.trim().split("\n");
//     const headers = lines[0].split(",");

//     return lines.slice(1).map((line) => {
//       const values = line.split(",");
//       const obj = {};

//       headers.forEach((key, index) => {
//         obj[key] =
//           key === "schedule" && values[index]?.includes("|")
//             ? values[index].split("|")
//             : values[index];
//       });

//       return obj;
//     });
//   } catch (error) {
//     console.error(`Error reading ${filename}:`, error);
//     return [];
//   }
// };

// export const saveJsonToTxtFile = async (filename, data) => {
//   try {
//     const keys = Object.keys(data[0]);
//     const rows = data
//       .map((item) =>
//         keys
//           .map((key) =>
//             key === "schedule" && Array.isArray(item[key])
//               ? item[key].join("|")
//               : item[key]
//           )
//           .join(",")
//       )
//       .join("\n");

//     const txtData = `${keys.join(",")}\n${rows}`;
//     await fs.writeFile(`./data/${filename}`, txtData, "utf-8");
//   } catch (error) {
//     console.error(`Error saving to ${filename}:`, error);
//     throw new Error(`Could not save data to file: ${filename}`);
//   }
// };

// export const saveArrayDataToTxtFile = async (filename, data, formatRow) => {
//   try {
//     if (!data || !data.length) {
//       throw new Error("Data is empty or not provided");
//     }

//     const header = Object.keys(data[0]).join(",");

//     const rows = data.map(formatRow).join("\n");

//     const txtData = `${header}\n${rows}`;

//     await fs.writeFile(`./data/${filename}`, txtData, "utf-8");
//   } catch (error) {
//     console.error(`Error saving array data to ${filename}:`, error);
//     throw new Error(`Could not save array data to file: ${filename}`);
//   }
// };

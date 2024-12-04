import fs from "fs/promises";
import { convertJsonToTxt } from "./convert.js";

export function lzssCompress(data) {
  const windowSize = 4096;
  const bufferSize = 18;
  const result = [];
  let cursor = 0;

  while (cursor < data.length) {
    let longestMatch = { offset: 0, length: 0 };
    const startWindow = Math.max(0, cursor - windowSize);
    for (let i = startWindow; i < cursor; i++) {
      let matchLength = 0;
      while (
        matchLength < bufferSize &&
        data[i + matchLength] === data[cursor + matchLength]
      ) {
        matchLength++;
      }

      if (matchLength > longestMatch.length) {
        longestMatch = { offset: cursor - i, length: matchLength };
      }
    }

    if (longestMatch.length >= 2) {
      result.push({ offset: longestMatch.offset, length: longestMatch.length });
      cursor += longestMatch.length;
    } else {
      result.push({ literal: data[cursor] });
      cursor++;
    }
  }

  return result;
}

export function lzssDecompress(compressedData) {
  const result = [];

  compressedData.forEach((entry) => {
    if (entry.literal !== undefined) {
      result.push(entry.literal);
    } else {
      const start = result.length - entry.offset;
      for (let i = 0; i < entry.length; i++) {
        result.push(result[start + i]);
      }
    }
  });

  return result.join("");
}

export function offsetCipherEncrypt(data, keyWord) {
  const keyShifts = keyWord.split("").map((char) => char.charCodeAt(0));
  const keyLength = keyShifts.length;

  return data
    .split("")
    .map((char, index) => {
      const shift = keyShifts[index % keyLength] % 256;
      return String.fromCharCode((char.charCodeAt(0) + shift) % 256);
    })
    .join("");
}

export function offsetCipherDecrypt(data, keyWord) {
  const keyShifts = keyWord.split("").map((char) => char.charCodeAt(0));
  const keyLength = keyShifts.length;

  return data
    .split("")
    .map((char, index) => {
      const shift = keyShifts[index % keyLength] % 256;
      return String.fromCharCode((char.charCodeAt(0) - shift + 256) % 256);
    })
    .join("");
}

export async function saveEncryptedData(filename, data, keyWord) {
  try {
    const compressedData = lzssCompress(JSON.stringify(data));
    const encryptedData = offsetCipherEncrypt(compressedData, keyWord);
    await fs.writeFile(filename, encryptedData, "utf-8");
  } catch (error) {
    console.error("Error saving encrypted data:", error);
    throw error;
  }
}

export async function readEncryptedData(filename, keyWord) {
  try {
    const encryptedData = await fs.readFile(filename, "utf-8");
    const compressedData = offsetCipherDecrypt(encryptedData, keyWord);
    const decompressedData = lzssDecompress(compressedData);
    return JSON.parse(decompressedData);
  } catch (error) {
    console.error("Error reading encrypted data:", error);
    throw error;
  }
}

export const decryptFileAndValidate = async (filename, keyWord) => {
  try {
    const encryptedData = await fs.readFile(`./data/${filename}`, "utf-8");
    const compressedData = offsetCipherDecrypt(encryptedData, keyWord);
    const plainData = lzssDecompress(JSON.parse(compressedData));
    return plainData;
  } catch (error) {
    console.error(`Error decrypting file ${filename}:`, error.message);
    return false;
  }
};

export const encryptFile = async (filename, keyWord) => {
  try {
    const plainData = await fs.readFile(`./data/${filename}`, "utf-8");
    const compressedData = lzssCompress(plainData);
    const encryptedData = offsetCipherEncrypt(
      JSON.stringify(compressedData),
      keyWord
    );
    await fs.writeFile(`./data/${filename}`, encryptedData, "utf-8");
  } catch (error) {
    console.error(`Error encrypting file ${filename}:`, error.message);
  }
};

export const saveAndEncryptData = async (filename, data, keyWord) => {
  try {
    const plainData = convertJsonToTxt(data);
    const compressedData = lzssCompress(plainData);
    const encryptedData = offsetCipherEncrypt(
      JSON.stringify(compressedData),
      keyWord
    );
    await fs.writeFile(`./data/${filename}`, encryptedData, "utf-8");
  } catch (error) {
    console.error(`Error encrypting file ${filename}:`, error.message);
  }
};

import { readTxtAsJson } from "../helpers/convert.js";
import { decryptFileAndValidate } from "./encrypt.js";
export const ENCRYPTION_KEY = "HELLO";

class Link {
  constructor(link) {
    const match = link.match(/^\$\{([^/]+)\/(\d+)\/([^}]+)\}$/);
    if (!match) {
      throw new Error(`Invalid link format: ${link}`);
    }
    const [, tableName, rowNumber] = match;
    this.tableName = tableName;
    this.rowNumber = parseInt(rowNumber, 10);
  }

  async resolveLink() {
    const decrypted = await decryptFileAndValidate(
      `${this.tableName}.txt`,
      ENCRYPTION_KEY
    );
    const entities = await readTxtAsJson(decrypted);

    const rowIndex = this.rowNumber - 1;
    if (rowIndex < 0 || rowIndex >= entities.length) {
      throw new Error(
        `Row number ${this.rowNumber} out of bounds for table ${this.tableName}`
      );
    }

    return entities[rowIndex];
  }

  static async resolveById(tableName, id) {
    const decrypted = await decryptFileAndValidate(
      `${this.tableName}.txt`,
      ENCRYPTION_KEY
    );
    const entities = await readTxtAsJson(decrypted);
    const entity = entities.find((entry) => entry.id == id);

    if (!entity) {
      throw new Error(`No entity with id ${id} found in table ${tableName}`);
    }

    return entity;
  }

  static async formatLinkById(tableName, id) {
    const decrypted = await decryptFileAndValidate(
      `${tableName}.txt`,
      ENCRYPTION_KEY
    );
    const entities = await readTxtAsJson(decrypted);
    const rowIndex = entities.findIndex((entry) => entry.id == id);

    if (rowIndex === -1) {
      throw new Error(`No entity with id ${id} found in table ${tableName}`);
    }

    const rowNumber = rowIndex + 1;
    return `\${${tableName}/${rowNumber}/id}`;
  }
}

export default Link;

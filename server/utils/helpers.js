import fs from "fs";

const PRODUCTS_FILE_PATH = "./data/products.json";

export const getJsonData = async () => {
  const rawData = await fs.promises.readFile(PRODUCTS_FILE_PATH, "utf-8");
  return JSON.parse(rawData);
};

export const writeJsonData = async (jsonData) => {
  await fs.promises.writeFile(
    PRODUCTS_FILE_PATH,
    JSON.stringify(jsonData, null, 2)
  );
};

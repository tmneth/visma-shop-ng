import { nanoid } from "nanoid/non-secure";
import { getJsonData, writeJsonData } from "../utils/helpers.js";

export const getProducts = async (req, res) => {
  try {
    const jsonData = await getJsonData();
    res.status(200).json(jsonData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to read the products data" });
  }
};

export const createProduct = async (req, res) => {};

export const updateProduct = async (req, res) => {};

export const deleteProduct = async (req, res) => {};

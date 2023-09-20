import { nanoid } from "nanoid/non-secure";
import { getJsonData, writeJsonData } from "../utils/helpers.js";

export const getProducts = async (req, res) => {
  console.log(nanoid(5), nanoid(5), nanoid(5), nanoid(5), nanoid(5));

  try {
    const jsonData = await getJsonData();
    res.status(200).json(jsonData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to read the products data" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, discount, imageUrl } = req.body;

    const jsonData = await getJsonData();

    const newProduct = {
      id: nanoid(5),
      name,
      description,
      price,
      discount,
      imageUrl,
    };

    jsonData.products.push(newProduct);

    await writeJsonData(jsonData);

    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateProduct = async (req, res) => {};

export const deleteProduct = async (req, res) => {};

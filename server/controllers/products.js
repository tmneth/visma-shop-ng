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

export const getProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const jsonData = await getJsonData();
    const product = jsonData.products.find((p) => p.id === id);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found!" });
    }
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

export const updateProduct = async (req, res) => {
  const id = req.params.id;
  const { name, description, price, discount, imageUrl } = req.body;

  try {
    const jsonData = await getJsonData();
    const product = jsonData.products.find((p) => p.id === id);

    if (product) {
      if (name) product.name = name;
      if (description) product.description = description;
      if (price) product.price = price;
      if (discount) product.discount = discount;
      if (imageUrl) product.imageUrl = imageUrl;

      await writeJsonData(jsonData);

      res
        .status(200)
        .json({ message: "Product updated successfully", product });
    } else {
      res.status(404).json({ message: "Product not found!" });
    }
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const jsonData = await getJsonData();
    const index = jsonData.products.findIndex((p) => p.id === id);

    if (index !== -1) {
      jsonData.products.splice(index, 1);
      writeJsonData(jsonData);
      res.status(200).json({ message: "Product deleted successfully!" });
    } else {
      res.status(404).json({ message: "Product not found!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete the product" });
  }
};

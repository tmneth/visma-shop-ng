import { nanoid } from "nanoid/non-secure";
import * as db from "../db/queries.js";

export const getProducts = async (req, res) => {
  try {
    const products = await db.getProducts();
    console.log(products);
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to read the products data" });
  }
};

export const getProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await db.getProductById(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve the product" });
  }
};

export const createProduct = async (req, res) => {
  const { name, description, price, discount, imageUrl } = req.body;
  const id = nanoid(5);
  try {
    const newProduct = await db.addProduct({
      id,
      name,
      description,
      price,
      discount,
      imageUrl,
    });
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add the product" });
  }
};

export const updateProduct = async (req, res) => {
  const id = req.params.id;
  const { name, description, price, discount, imageUrl } = req.body;
  try {
    const updatedProduct = await db.updateProduct(id, {
      name,
      description,
      price,
      discount,
      imageUrl,
    });
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update the product" });
  }
};

export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const success = await db.deleteProductById(id);
    if (success) {
      res.status(200).json({ message: "Product deleted successfully!" });
    } else {
      res.status(404).json({ message: "Product not found!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete the product" });
  }
};

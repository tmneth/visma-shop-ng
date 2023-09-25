import express from "express";

import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", auth, createProduct);
router.put("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);

export default router;

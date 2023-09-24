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
router.post("/", createProduct);
router.put("/:id", auth, updateProduct);
router.get("/:id", getProduct);
router.delete("/:id", auth, deleteProduct);

export default router;

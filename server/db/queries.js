import pool from "./db.js";

export const getProducts = async () => {
  const { rows: products } = await pool.query("SELECT * FROM products", []);
  return products;
};

export const getProductById = async (productId) => {
  const { rows } = await pool.query("SELECT * FROM products WHERE id = $1", [
    productId,
  ]);
  return rows[0];
};

export const addProduct = async (product) => {
  const { rows } = await pool.query(
    "INSERT INTO products (id, name, description, price, discount, imageurl) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [
      product.id,
      product.name,
      product.description,
      product.price,
      product.discount,
      product.imageurl,
    ]
  );
  return rows[0];
};

export const updateProduct = async (productId, product) => {
  const { rows } = await pool.query(
    "UPDATE products SET name = $2, description = $3, price = $4, discount = $5, imageurl = $6 WHERE id = $1 RETURNING *",
    [
      productId,
      product.name,
      product.description,
      product.price,
      product.discount,
      product.imageurl,
    ]
  );
  return rows[0];
};

export const deleteProductById = async (productId) => {
  const { rowCount } = await pool.query("DELETE FROM products WHERE id = $1", [
    productId,
  ]);
  return rowCount > 0;
};

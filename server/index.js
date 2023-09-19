import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import productsRoutes from "./routes/products.js";

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/api/products", productsRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

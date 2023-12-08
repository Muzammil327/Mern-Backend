import app from "./app.js";
import colors from "colors";
import express from "express";
import connectDB from "./utils/dbConn.js";
import userRoutes from "./routes/userRoutes.js";
import catgeoryRoutes from "./routes/catgeoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import { PORT,DEV_MODE } from "./config.js";
import { fileURLToPath } from 'url';
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connection String
connectDB();

app.use("/assets", express.static(path.join(__dirname, "public/assets")));

app.use("/api", userRoutes);
app.use("/api/catgeory", catgeoryRoutes);
app.use("/api/product", productRoutes);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, () => {
  console.log(`Server ${DEV_MODE} running on port ${PORT}`.bgCyan.white);
});

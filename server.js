import app from "./app.js";
import colors from "colors";
import connectDB from "./utils/dbConn.js";
import userRoutes from "./routes/userRoutes.js";
import catgeoryRoutes from "./routes/catgeoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import env from "./utils/ValidateEnv.js";
import { PORT } from "./config.js";

// Connection String
connectDB();

// Serve static assets
app.use(express.static(path.join(__dirname, 'build')));
app.use("/api", userRoutes);
app.use("/api/catgeory", catgeoryRoutes);
app.use("/api/product", productRoutes);

// Catch-all route that serves index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, () => {
  console.log(`Server ${env.DEV_MODE} running on port PORT`.bgCyan.white);
});

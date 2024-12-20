import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import morgan from "morgan";
import authRoute from "./routes/authRoute.js";
import contactRoute from "./routes/contactRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import orderRoute from "./routes/orderRoute.js";
import rentProductRoutes from "./routes/rentProductRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
connectDB();

app.use(
  cors({
    origin: "https://123mandar.github.io", // Replace with your GitHub Pages URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Include credentials like cookies
  })
);

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/rent-product", rentProductRoutes);

app.get("/", (req, res) => {
  res.send({ message: "Welcome to the TCET Marketplace API!" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server Listening on ${PORT}`.bgRed.white);
});
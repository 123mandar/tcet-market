import dotenv from "dotenv";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import morgan from "morgan";
import authRoute from "./routes/authRoute.js";
import contactRoute from "./routes/contactRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import orderRoute from "./routes/orderRoute.js";
import rentProductRoutes from "./routes/rentProductRoutes.js";
import visitorRoutes from "./routes/visitorRoutes.js";
import serviceRoute from "./routes/serviceRoute.js";
import chatRoute from "./routes/chatRoute.js";
import cors from "cors";

dotenv.config();

const app = express();
const server = http.createServer(app);
connectDB();

const allowedOrigins = [
  "https://123mandar.github.io",
  "http://localhost:3000",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/rent-product", rentProductRoutes);
app.use("/api/v1/service", serviceRoute);
app.use("/api/v1/visitors", visitorRoutes);
app.use("/api/v1/chats", chatRoute);

app.get("/", (req, res) => {
  res.send({ message: "Welcome to the TCET Marketplace API!" });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server Listening on ${PORT}`.bgRed.white);
});

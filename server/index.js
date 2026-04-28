import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";

// Config dotenv.
dotenv.config();

// Config app.
const app = express();

// Config cors.
app.use(
  cors({
    origin: process.env.CORS,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

// Config port.
const PORT = process.env.PORT;

// Connect database.
connectDB();

// Common Middlewares.
app.use(express.json());

// Api v1 routes.
// app.use("/api", apiRoutes)

// Config server.
app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log(`Server running on port ${PORT}`);
  }
});

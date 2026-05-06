import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { apiRouter } from "./routes/index.js";

// config dotenv
dotenv.config();

// config app
const app = express();

// config cors
app.use(
  cors({
    origin: process.env.CORS,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

// config port
const PORT = process.env.PORT;

// connect database
connectDB();

// common middlewares
app.use(express.json());
app.use(cookieParser());

// api v1 routes
app.use("/api", apiRouter)

// config server
app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log(`Server running on port ${PORT}`);
  }
});

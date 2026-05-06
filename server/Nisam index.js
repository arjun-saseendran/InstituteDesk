import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import { apiRouter } from "./routes/index.js";

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
app.use(cookieParser());
// Api v1 routes.
app.use("/api", apiRouter)

// manage 404 error
app.use((req,res,next)=>{
   res.status(404).json({ message: "Endpoint not found" });
})

// Config server.
app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log(`Server running on port ${PORT}`);
  }
});

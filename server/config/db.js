import mongoose from "mongoose";

// Config database.
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB database connected");
  } catch (error) {
    console.log("MongoDB connection error", error);
  }
};

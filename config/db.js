import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // loads .env from root

const connectDB = async () => {
  try {
    const uri = process.env.URI;
    if (!uri) throw new Error("MongoDB URI not found");

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
  }
};

connectDB();

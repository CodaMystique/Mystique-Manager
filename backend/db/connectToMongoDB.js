import mongoose from "mongoose";

export default async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI, {
      dbName: "Task-Manager",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.log("Failed to connect to MongoDB : " + error.message);
  }
}

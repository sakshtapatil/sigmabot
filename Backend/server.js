import express from "express";
import cors from "cors";
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";
import authRoutes from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", chatRoutes);
app.use("/api/auth", authRoutes);





app.get("/", (req, res) => {
  res.send("SigmaGPT Backend is Running 🚀");

});

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected with Database!");
    } catch(err) {
        console.log("Failed to connect with Db", err);
    }
}

// app.post("/test", async (req, res) => {
//   try {
//     const { message } = req.body;

//     if (!message) {
//       return res.status(400).json({
//         success: false,
//         message: "Message is required.",
//       });
//     }

//     const response = await ai.models.generateContent({
//       model: "gemini-3.6-flash",
//       contents: message,
//     });

//     res.status(200).json({
//       success: true,
//       reply: response.text,
//     });
//   } catch (error) {
//     console.error("Gemini Error:", error);

//     res.status(500).json({
//       success: false,
//       message: "Failed to generate response.",
//       error: error.message,
//     });
//   }
// });
  connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
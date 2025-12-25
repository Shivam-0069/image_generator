import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

/* ✅ CORS – FIXED FRONTEND URL */
app.use(
  cors({
    origin: [
      "https://image-generator-1-1sd0.onrender.com", // ✅ correct frontend
      "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(express.json());

await connectDB();

app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);

app.get("/", (req, res) => {
  res.send("API Working Fine");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

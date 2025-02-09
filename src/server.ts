import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db";
import listRoutes from "./routes/list.routes";

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" })); // Increase body size limit for large payloads (like images)

// Routes
app.use("/api", listRoutes);

// Basic error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).send({ error: "Something went wrong!" });
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));

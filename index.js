import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDb from "./config/db.js";
import routes from "./routes/index.js";
import morgan from 'morgan'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ CORS: allow frontend domains and localhost
const allowedOrigins = [
  "http://localhost:3000",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"))

// ✅ API routes
app.use("/api/v1", routes);

// ✅ Connect database
ConnectDb();

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

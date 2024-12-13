import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
// const connectMongoDB = require("./config/db");
import userRoutes from "./routes/userRoutes.js";
// import phonebookRoutes from "./routes/phonebookRoutes";
import { checkConnection } from "./config/db.js";
import createAllTable from "./utils/dbUtils.js";

const app = express();
config();

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowable HTTP methods
  allowedHeaders: "Content-Type,Authorization", // Allowed headers
  credentials: true, // Allows cookies and credentials if necessary
};

app.use(cors(corsOptions));
app.use(json());

app.use("/api/users", userRoutes);
// app.use("/api/phonebook", phonebookRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await checkConnection();
    await createAllTable();
  } catch (error) {
    console.log("fail connection mysql DB", error);
  }
});

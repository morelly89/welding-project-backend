const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const projectRequestRoutes = require("./routes/projectRequestRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Morelly Welding backend is running");
});

app.use("/api/project-requests", projectRequestRoutes);
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

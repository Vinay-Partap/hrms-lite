require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

console.log("Starting HRMS Lite Backend...");

const employeeRoutes = require("./routes/employeeRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

console.log("About to register routes");

// Routes
app.use("/api/employees", employeeRoutes);
app.use("/api/attendance", attendanceRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("HRMS Lite Backend Running");
});

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

// IMPORTANT: Render provides PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

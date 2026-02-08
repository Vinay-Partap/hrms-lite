// 🔴 DEBUG: confirm server file is loaded
console.log("SERVER FILE LOADED");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// 🔴 DEBUG: before loading routes
console.log("About to import route files");

const employeeRoutes = require("./routes/employeeRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// 🔴 DEBUG: before registering routes
console.log("About to register routes");

// ✅ API routes
app.use("/api/employees", employeeRoutes);
app.use("/api/attendance", attendanceRoutes);

// Root route (health check)
app.get("/", (req, res) => {
  res.send("HRMS Lite Backend Running");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Port (Render provides PORT automatically)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.log("Attendance routes file loaded");

const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");

// GET all attendance
router.get("/", async (req, res) => {
  try {
    const records = await Attendance.find();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD attendance
router.post("/", async (req, res) => {
  try {
    const record = new Attendance(req.body);
    await record.save();
    res.json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE all attendance records (for cleanup)
router.delete("/all", async (req, res) => {
  try {
    await Attendance.deleteMany({});
    res.json({ message: "All attendance records deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 👇 THIS WAS MISSING (CRITICAL)
module.exports = router;

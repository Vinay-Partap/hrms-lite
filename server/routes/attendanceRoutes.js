const express = require("express");
const Attendance = require("../models/Attendance");

const router = express.Router();

// Mark attendance
router.post("/", async (req, res) => {
  try {
    const record = await Attendance.create(req.body);
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get ALL attendance records
router.get("/", async (req, res) => {
  const records = await Attendance.find().sort({ date: -1 });
  res.json(records);
});

// Get attendance for one employee
router.get("/:employeeId", async (req, res) => {
  const records = await Attendance.find({
    employeeId: req.params.employeeId
  });
  res.json(records);
});


module.exports = router;

const express = require("express");
const Employee = require("../models/Employee");

const router = express.Router();

// Add employee
router.post("/", async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Employee ID already exists" });
    }
    res.status(400).json({ message: err.message });
  }
});

// Get all employees
router.get("/", async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

// Delete employee
router.delete("/:id", async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: "Employee deleted" });
});

module.exports = router;

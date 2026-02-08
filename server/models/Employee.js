const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  employeeId: String,
  fullName: String,
  email: String,
  department: String,
});

module.exports = mongoose.model("Employee", EmployeeSchema);

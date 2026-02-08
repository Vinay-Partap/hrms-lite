const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  date: String,
  status: String,
});

module.exports = mongoose.model("Attendance", AttendanceSchema);

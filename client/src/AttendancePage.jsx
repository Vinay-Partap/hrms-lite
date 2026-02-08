import { useEffect, useState } from "react";

function AttendancePage({ mode }) {
  const [employees, setEmployees] = useState([]);
  const [records, setRecords] = useState([]);

  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");

  const [filterEmployee, setFilterEmployee] = useState("");
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/employees")
      .then(res => res.json())
      .then(setEmployees);

    if (mode === "records") {
      fetch("http://localhost:5000/api/attendance")
        .then(res => res.json())
        .then(setRecords);
    }
  }, [mode]);

  const markAttendance = async () => {
    if (!employeeId || !date) {
      alert("Select employee and date");
      return;
    }

    const emp = employees.find(e => e.employeeId === employeeId);

    await fetch("http://localhost:5000/api/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        employeeId,
        employeeName: emp?.fullName,
        date,
        status
      })
    });

    alert("Attendance marked");
  };

  const filteredRecords = records.filter(r => {
    return (
      (!filterEmployee || r.employeeId === filterEmployee) &&
      (!filterDate || r.date === filterDate)
    );
  });

  /* ========== MARK ATTENDANCE PAGE ========== */
  if (mode === "mark") {
    return (
      <div className="card">
        <h2>Mark Attendance</h2>

        <div className="form-row">
          <select onChange={e => setEmployeeId(e.target.value)}>
            <option value="">Select Employee</option>
            {employees.map(emp => (
              <option key={emp._id} value={emp.employeeId}>
                {emp.fullName} ({emp.employeeId})
              </option>
            ))}
          </select>

          <input type="date" onChange={e => setDate(e.target.value)} />

          <select onChange={e => setStatus(e.target.value)}>
            <option>Present</option>
            <option>Absent</option>
          </select>

          <button onClick={markAttendance}>Mark Attendance</button>
        </div>
      </div>
    );
  }

  /* ========== ATTENDANCE RECORDS PAGE ========== */
  return (
    <div className="card">
      <h2>Attendance Records</h2>

      {/* FILTERS */}
      <div className="form-row">
        <select onChange={e => setFilterEmployee(e.target.value)}>
          <option value="">All Employees</option>
          {employees.map(emp => (
            <option key={emp._id} value={emp.employeeId}>
              {emp.fullName}
            </option>
          ))}
        </select>

        <input
          type="date"
          onChange={e => setFilterDate(e.target.value)}
        />
      </div>

      {/* RECORD LIST */}
      {filteredRecords.length === 0 && <p>No records found</p>}

      {filteredRecords.map((r, i) => (
        <div key={i}>
          {r.employeeName} ({r.employeeId}) — {r.date} : {r.status}
        </div>
      ))}
    </div>
  );
}

export default AttendancePage;

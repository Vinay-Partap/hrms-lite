import { useEffect, useState } from "react";

function AttendancePage({ mode }) {
  const [employees, setEmployees] = useState([]);
  const [records, setRecords] = useState([]);

  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");

  const [filterEmployee, setFilterEmployee] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const BASE_URL = "https://hrms-lite-backend-57v7.onrender.com";

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/employees`);
        const data = await res.json();
        setEmployees(data);
      } catch (err) {
        console.error("Failed to fetch employees", err);
      }
    };

    fetchEmployees();

    if (mode === "records") {
      const fetchRecords = async () => {
        try {
          const res = await fetch(`${BASE_URL}/api/attendance`);
          const data = await res.json();
          setRecords(data);
        } catch (err) {
          console.error("Failed to fetch attendance records", err);
        }
      };

      fetchRecords();
    }
  }, [mode]);

  const markAttendance = async () => {
    if (!employeeId || !date) {
      alert("Select employee and date");
      return;
    }

    const emp = employees.find(e => e.employeeId === employeeId);

    try {
      await fetch(`${BASE_URL}/api/attendance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeId,
          employeeName: emp?.fullName,
          date,
          status
        })
      });

      setEmployeeId("");
      setDate("");
      setStatus("Present");
      alert("Attendance marked successfully");
    } catch (err) {
      console.error("Failed to mark attendance", err);
      alert("Failed to mark attendance");
    }
  };

  const clearAllRecords = async () => {
    if (!confirm("Are you sure you want to delete ALL attendance records? This cannot be undone!")) {
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/attendance/all`, {
        method: "DELETE"
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server error: ${res.status} - ${errorText}`);
      }

      const data = await res.json();
      alert(data.message);
      setRecords([]);
    } catch (err) {
      console.error("Failed to delete records", err);
      alert(`Failed to delete records: ${err.message}`);
    }
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
          <select value={employeeId} onChange={e => setEmployeeId(e.target.value)}>
            <option value="">Select Employee</option>
            {employees.map(emp => (
              <option key={emp._id} value={emp.employeeId}>
                {emp.fullName} ({emp.employeeId})
              </option>
            ))}
          </select>

          <input type="date" value={date} onChange={e => setDate(e.target.value)} />

          <select value={status} onChange={e => setStatus(e.target.value)}>
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h2>Attendance Records</h2>
        <button 
          className="btn-danger" 
          onClick={clearAllRecords}
          style={{ fontSize: "13px", padding: "8px 16px" }}
        >
          Clear All Records
        </button>
      </div>

      {/* FILTERS */}
      <div className="form-row">
        <select value={filterEmployee} onChange={e => setFilterEmployee(e.target.value)}>
          <option value="">All Employees</option>
          {employees.map(emp => (
            <option key={emp._id} value={emp.employeeId}>
              {emp.fullName}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={filterDate}
          onChange={e => setFilterDate(e.target.value)}
        />
      </div>

      {/* RECORD LIST */}
      {filteredRecords.length === 0 && <p>No records found</p>}

      {filteredRecords.map((r) => (
        <div 
          key={r._id}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "12px",
            marginBottom: "8px",
            backgroundColor: "#f9fafb",
            borderRadius: "8px"
          }}
        >
          <span style={{ flex: 1 }}>
            <strong>{r.employeeName || "N/A"}</strong>
          </span>
          <span style={{ flex: 1 }}>
            ID: {r.employeeId || "Not Available"}
          </span>
          <span style={{ flex: 1 }}>
            {r.date}
          </span>
          <span 
            style={{ 
              flex: 1,
              fontWeight: "600",
              color: r.status === "Present" ? "#10b981" : "#ef4444"
            }}
          >
            {r.status}
          </span>
        </div>
      ))}
    </div>
  );
}

export default AttendancePage;

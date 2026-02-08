import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import EmployeePage from "./EmployeePage";
import AttendancePage from "./AttendancePage";
import LandingPage from "./LandingPage";

function App() {
  const [activePage, setActivePage] = useState("landing");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const [employees, setEmployees] = useState([]);
  const [records, setRecords] = useState([]);

  /* Dark mode persistence */
  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  /* Fetch data */
  useEffect(() => {
    fetch("http://localhost:5000/api/employees")
      .then(res => res.json())
      .then(setEmployees);

    fetch("http://localhost:5000/api/attendance")
      .then(res => res.json())
      .then(setRecords);
  }, []);

  /* Landing Page */
  if (activePage === "landing") {
    return (
      <div className="container">
        <LandingPage onEnter={() => setActivePage("dashboard")} />
      </div>
    );
  }

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-logo">HRMS Lite</div>

        <div className="nav-links">
          <button
            className={activePage === "dashboard" ? "active" : ""}
            onClick={() => setActivePage("dashboard")}
          >
            📊 Dashboard
          </button>

          <button
            className={activePage === "mark" ? "active" : ""}
            onClick={() => setActivePage("mark")}
          >
            📝 Mark Attendance
          </button>

          <button
            className={activePage === "records" ? "active" : ""}
            onClick={() => setActivePage("records")}
          >
            📁 Records
          </button>

          <button onClick={() => setDarkMode(!darkMode)}>
            🌙
          </button>
        </div>
      </nav>

      {/* CONTENT */}
      <div className="container">
        {activePage === "dashboard" && (
          <Dashboard employees={employees} records={records} />
        )}

        {activePage === "mark" && (
          <AttendancePage mode="mark" />
        )}

        {activePage === "records" && (
          <AttendancePage mode="records" />
        )}

        <EmployeePage />
      </div>
    </>
  );
}

export default App;

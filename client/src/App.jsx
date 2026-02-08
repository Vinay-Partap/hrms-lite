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

  const BASE_URL = "https://hrms-lite-backend-57v7.onrender.com";

  /* Dark mode persistence */
  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  /* Fetch data */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empRes, attRes] = await Promise.all([
          fetch(`${BASE_URL}/api/employees`),
          fetch(`${BASE_URL}/api/attendance`)
        ]);

        const empData = await empRes.json();
        const attData = await attRes.json();

        setEmployees(empData);
        setRecords(attData);
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };

    fetchData();
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
            className={activePage === "employees" ? "active" : ""}
            onClick={() => setActivePage("employees")}
          >
            👥 Employees
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

          <button onClick={() => setDarkMode(!darkMode)} title="Toggle dark mode">
            🌙
          </button>
        </div>
      </nav>

      {/* CONTENT */}
      <div className="container">
        {activePage === "dashboard" && (
          <Dashboard employees={employees} records={records} />
        )}

        {activePage === "employees" && (
          <EmployeePage />
        )}

        {activePage === "mark" && (
          <AttendancePage mode="mark" />
        )}

        {activePage === "records" && (
          <AttendancePage mode="records" />
        )}
      </div>
    </>
  );
}

export default App;

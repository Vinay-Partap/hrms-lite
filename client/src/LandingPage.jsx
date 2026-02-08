function LandingPage({ onEnter }) {
  return (
    <div className="card" style={{ marginTop: "40px" }}>
      <h1>HRMS Lite</h1>

      <p>
        <strong>HRMS (Human Resource Management System)</strong> is a digital
        solution that helps organizations manage employees, attendance, and
        workforce data efficiently.
      </p>

      <p>
        <strong>HRMS Lite</strong> focuses on simplicity, clarity, and real-world
        usability. Unlike bloated HR tools, it provides only what matters:
        employee records, attendance tracking, and insights — cleanly and
        efficiently.
      </p>

      <p>
        This system is designed to be lightweight, fast, and easy to use across
        all devices.
      </p>

      <button onClick={onEnter} className="btn-top">
        Enter Application →
      </button>

      <p style={{ marginTop: "30px", fontSize: "14px", color: "#64748b" }}>
        Designed & Developed by <strong>Vinay Partap Singh</strong>
      </p>
    </div>
  );
}

export default LandingPage;

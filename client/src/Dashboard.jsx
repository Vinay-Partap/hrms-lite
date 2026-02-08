function Dashboard({ employees = [], records = [] }) {
  const totalEmployees = employees.length;
  const totalRecords = records.length;

  return (
    <div className="card">
      <h2>Dashboard</h2>

      <div className="dashboard-grid">
        <div className="stat-box">
          <h3>Total Employees</h3>
          <p>{totalEmployees}</p>
        </div>

        <div className="stat-box">
          <h3>Total Attendance Records</h3>
          <p>{totalRecords}</p>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Employee ID</th>
            <th>Present Days</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => {
            const presentDays = records.filter(
              r =>
                r.employeeId === emp.employeeId &&
                r.status === "Present"
            ).length;

            return (
              <tr key={emp._id}>
                <td>{emp.fullName}</td>
                <td>{emp.employeeId}</td>
                <td>{presentDays}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {employees.length === 0 && (
        <p style={{ marginTop: "16px", textAlign: "center", color: "#666" }}>
          No employees found
        </p>
      )}
    </div>
  );
}

export default Dashboard;

function Dashboard({ employees, records }) {
  return (
    <div className="card">
      <h2>Dashboard</h2>

      <div className="dashboard-grid">
        <div className="stat-box">
          <h3>Total Employees</h3>
          <p>{employees.length}</p>
        </div>

        <div className="stat-box">
          <h3>Total Attendance Records</h3>
          <p>{records.length}</p>
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
    </div>
  );
}

export default Dashboard;

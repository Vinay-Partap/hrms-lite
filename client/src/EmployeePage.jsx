import { useEffect, useState } from "react";

function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    department: ""
  });

  const fetchEmployees = async () => {
    const res = await fetch("http://localhost:5000/api/employees");
    const data = await res.json();
    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    setForm({
      employeeId: "",
      fullName: "",
      email: "",
      department: ""
    });

    fetchEmployees();
  };

  const deleteEmployee = async (id) => {
    await fetch(`http://localhost:5000/api/employees/${id}`, {
      method: "DELETE"
    });
    fetchEmployees();
  };

  return (
    <div className="card">
      <h2>Add Employee</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            placeholder="Employee ID"
            value={form.employeeId}
            onChange={e => setForm({ ...form, employeeId: e.target.value })}
          />
          <input
            placeholder="Full Name"
            value={form.fullName}
            onChange={e => setForm({ ...form, fullName: e.target.value })}
          />
          <input
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
          <input
            placeholder="Department"
            value={form.department}
            onChange={e => setForm({ ...form, department: e.target.value })}
          />
        </div>

        <button type="submit" className="btn-top">
          Add Employee
        </button>
      </form>

      <h2 style={{ marginTop: "24px" }}>Employees</h2>

      {employees.map(emp => (
        <div
          key={emp._id}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "8px"
          }}
        >
          <span>
            {emp.fullName} ({emp.department})
          </span>
          <button
            className="btn-danger btn-inline"
            onClick={() => deleteEmployee(emp._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default EmployeePage;

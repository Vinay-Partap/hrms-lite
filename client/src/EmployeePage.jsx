import { useEffect, useState } from "react";

function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    department: ""
  });

  const BASE_URL = "https://hrms-lite-backend-57v7.onrender.com";

  const fetchEmployees = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/employees`);
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      console.error("Failed to fetch employees", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!form.employeeId || !form.fullName || !form.email || !form.department) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      console.log("Sending request to:", `${BASE_URL}/api/employees`);
      console.log("Request body:", form);

      const res = await fetch(`${BASE_URL}/api/employees`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      console.log("Response status:", res.status);
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error response:", errorText);
        throw new Error(`Failed with status ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      console.log("Employee added:", data);

      setForm({
        employeeId: "",
        fullName: "",
        email: "",
        department: ""
      });

      alert("Employee added successfully");
      fetchEmployees();
    } catch (err) {
      console.error("Failed to add employee", err);
      alert(`Failed to add employee: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await fetch(`${BASE_URL}/api/employees/${id}`, {
        method: "DELETE"
      });
      fetchEmployees();
    } catch (err) {
      console.error("Failed to delete employee", err);
    }
  };

  return (
    <div className="card">
      <h2>Add Employee</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            placeholder="Employee ID"
            value={form.employeeId}
            onChange={(e) =>
              setForm({ ...form, employeeId: e.target.value })
            }
          />
          <input
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e) =>
              setForm({ ...form, fullName: e.target.value })
            }
          />
          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
          <input
            placeholder="Department"
            value={form.department}
            onChange={(e) =>
              setForm({ ...form, department: e.target.value })
            }
          />
        </div>

        <button type="submit" className="btn-top" disabled={loading}>
          {loading ? "Adding..." : "Add Employee"}
        </button>
      </form>

      <h2 style={{ marginTop: "24px" }}>Employees</h2>

      {employees.map((emp) => (
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

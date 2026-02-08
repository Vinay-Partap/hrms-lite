# HRMS Lite – Human Resource Management System

## Project Overview

HRMS Lite is a lightweight full-stack Human Resource Management System built to manage employees and their attendance efficiently.  
The project demonstrates an end-to-end web application using a modern frontend, RESTful backend APIs, and cloud deployment.

The application allows users to:
- Add, view, and delete employees
- Mark and view employee attendance
- Access a simple dashboard and landing page
- Store data persistently using MongoDB

This project is intended for academic submission, learning full-stack development, and small-scale HR use cases.

---

## Tech Stack Used

### Frontend
- React.js (Vite)
- JavaScript (ES6+)
- HTML5
- CSS3
- Fetch API for client–server communication

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose ODM

### Deployment & Tools
- Frontend Deployment: Vercel
- Backend Deployment: Render
- Version Control: Git and GitHub

---
## Project Structure
```text
hrms-lite/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── App.jsx
│   │   ├── LandingPage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── EmployeePage.jsx
│   │   ├── AttendancePage.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
│
├── server/                 # Backend (Node + Express)
│   ├── models/
│   │   ├── Employee.js
│   │   └── Attendance.js
│   ├── routes/
│   │   ├── employeeRoutes.js
│   │   └── attendanceRoutes.js
│   ├── server.js
│   └── package.json
│
└── README.md
```
----

## Steps to Run the Project Locally

### Step 1: Clone the Repository
```bash
git clone https://github.com/Vinay-Partap/hrms-lite.git
cd hrms-lite
```
### Step 2: Backend Setup
```bash
cd server
npm install
```
 Create a .env file inside the server directory with the following content:
```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
```
 Start the backend server:
```bash
npm start
```
The backend will run on:

```bash
http://localhost:5000
```
### Step 3: Frontend Setup
Open a new terminal and run:

```bash
cd client
npm install
npm run dev
```
The frontend will run on:

```bash
http://localhost:5173
```
## Live Deployment

- **Frontend (Vercel):**  
  👉 [https://hrms-lite-delta-sooty.vercel.app/](https://hrms-lite-delta-sooty.vercel.app/)

- **Backend (Render):**  
  👉 [https://hrms-lite-backend-57v7.onrender.com](https://hrms-lite-backend-57v7.onrender.com)
------
### Assumptions and Limitations
- User authentication and authorization are not implemented.
- The system is designed for small teams or academic/demo purposes.
- Attendance and employee records do not include pagination.
- Input validation is minimal and can be enhanced.
- Performance may vary due to free-tier cloud hosting limitations.
- Advanced analytics, reports, and exports are not included.
------
### Future Enhancements
- User authentication (JWT)
- Role-based access (Admin / HR)
- Advanced attendance analytics
- CSV export of attendance data
- Email notifications
-----
## Developed By
### Vinay Partap Singh
#### Computer Science Engineering Student
#### Full-Stack Development Enthusiast
-----
### License
This project is developed for educational purposes

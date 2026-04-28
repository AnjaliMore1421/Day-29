import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Patients from "./components/Patients";
import Doctors from "./components/Doctors";
import Login from "./components/Login";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [user, setUser] = useState(null);

  //  LOGIN SUCCESS
  const handleLogin = (userData) => {
    setUser(userData);
    setPage("dashboard");
  };

  //  LOGOUT FUNCTION
  const handleLogout = () => {
    setUser(null);     // clear user
    setPage("dashboard"); // reset page
  };

  // LOGIN SCREEN
  if (!user) {
    return <Login onLoginSuccess={handleLogin} />;
  }

  // MAIN APP
  return (
    <div className="layout">
      <Sidebar page={page} setPage={setPage} />

      <div className="main">
        
        {/* HEADER WITH LOGOUT */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Header />

          <button
            onClick={handleLogout}
            style={{
              height: "35px",
              marginTop: "20px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </div>

        {/* PAGES */}
        {page === "dashboard" && <Dashboard />}
        {page === "patients" && <Patients />}
        {page === "doctors" && <Doctors />}
      </div>
    </div>
  );
}

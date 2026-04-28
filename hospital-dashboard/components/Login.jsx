import { useState } from "react";

export default function Login({ onLoginSuccess }) {
  // store input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // error message state
  const [error, setError] = useState("");

  // handle login
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // -------------------------
    // SIMPLE STATIC VALIDATION
    // -------------------------
    if (email === "admin@hospital.com" && password === "admin123") {
      // success login
      onLoginSuccess({ name: "Admin User", role: "Admin" });
    } else {
      // error message
      setError("Invalid credentials! Try admin@hospital.com / admin123");
    }
  };

  return (
    <div className="login-container">

      <form onSubmit={handleSubmit} className="card">

        <h2>🏥 MediCare Login</h2>

        {/* error message */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* email input */}
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* password input */}
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* login button */}
        <button type="submit">
          Login
        </button>

      </form>
    </div>
  );
}

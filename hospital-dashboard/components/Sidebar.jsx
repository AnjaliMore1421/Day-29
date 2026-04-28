import useUIStore from "../zustand/useUIStore";

export default function Sidebar({ page, setPage }) {
  // Zustand state
  const { sidebarOpen, toggleSidebar } = useUIStore();

  return (
    <div
      className="sidebar"
      style={{
        width: sidebarOpen ? "230px" : "70px",
        transition: "0.3s",
      }}
    >
      {/* toggle button */}
      <button onClick={toggleSidebar}>
        {sidebarOpen ? "⬅" : "➡"}
      </button>

      <h2>Medicare</h2>

      <ul>
        <li onClick={() => setPage("dashboard")}>Dashboard</li>
        <li onClick={() => setPage("patients")}>Patients</li>
        <li onClick={() => setPage("doctors")}>Doctors</li>
      </ul>
    </div>
  );
}

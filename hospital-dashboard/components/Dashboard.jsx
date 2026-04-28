import { useEffect } from "react";
import gsap from "gsap";

export default function Dashboard() {
  useEffect(() => {
    // initial state
    gsap.set(".card", { opacity: 1, y: 0 });

    // animation effect
    gsap.fromTo(
      ".card",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
      }
    );
  }, []);

  return (
    <div>
      <h2>Dashboard Overview</h2>

      <div className="grid">
        <div className="card">👨‍⚕️ Doctors: 52</div>
        <div className="card">🧑 Patients: 1200</div>
        <div className="card">🛏 Beds: 300</div>
        <div className="card">🚑 Emergency: Active</div>
      </div>
    </div>
  );
}

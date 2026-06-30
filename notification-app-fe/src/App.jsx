import { useState } from "react";
import "./App.css";

const data = [
  { id: 1, type: "warnings", message: "Room 101 is closed", timestamp: "2026-06-30" },
  { id: 2, type: "events", message: "Sports meet at 4 PM", timestamp: "2026-06-30" },
  { id: 3, type: "info", message: "Library opens at 8 AM", timestamp: "2026-06-30" }
];

function App() {
  const [show, setShow] = useState(false);

  return (
    <div className="page">
      <h1>Campus Notifications</h1>
      <button onClick={() => setShow(!show)}>Show</button>
      {show && data.map((n) => (
        <div className="box" key={n.id}>
          <p>{n.type}</p>
          <p>{n.message}</p>
          <p>{n.timestamp}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
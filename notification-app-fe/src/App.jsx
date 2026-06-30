import { useEffect, useState } from "react";
import "./App.css";
import { NotificationFilter } from "./components/NotificationFilter";

const API_URL = "http://4.224.186.213/evaluation-service/notifications";

function App() {
  const [items, setItems] = useState([]);
  const [f, setF] = useState("All");
  const [ld, setLd] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`Failed to fetch notifications (${res.status})`);

        const data = await res.json();
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data.notifications)
          ? data.notifications
          : Array.isArray(data.data)
          ? data.data
          : [];

        setItems(list);
        setErr("");
      } catch (e) {
        console.error(e);
        setErr(e.message);
        setItems([]);
      } finally {
        setLd(false);
      }
    }

    load();
  }, []);

  const getW = (type = "") => {
    const t = String(type).toLowerCase();
    if (t === "warnings") return 3;
    if (t === "events") return 2;
    if (t === "info") return 1;
    return 0;
  };

  let list = [...items];

  list.sort((a, b) => {
    const aw = getW(a.type);
    const bw = getW(b.type);

    if (bw !== aw) return bw - aw;
    return new Date(b.timestamp) - new Date(a.timestamp);
  });

  list = list.slice(0, 10);

  if (f !== "All") {
    list = list.filter((x) => String(x.type || "").toLowerCase() === f.toLowerCase());
  }

  return (
    <div className="page">
      <h1>Campus Notifications</h1>

      <h2>Filter</h2>
      <NotificationFilter value={f} onChange={setF} />

      <h2>Priority Inbox (Top 10)</h2>

      {ld ? (
        <p>Loading notifications...</p>
      ) : err ? (
        <p style={{ color: "red" }}>{err}</p>
      ) : list.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        list.map((item, i) => (
          <div className="box" key={item.id ?? `${item.type}-${item.timestamp}-${i}`}>
            <p>id: {item.id}</p>
            <p>type: {item.type}</p>
            <p>message: {item.message}</p>
            <p>timestamp: {item.timestamp}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
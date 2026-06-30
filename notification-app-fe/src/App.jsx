import { useEffect, useState } from "react";
import "./App.css";
import { NotificationFilter } from "./components/NotificationFilter";

const API_URL = "http://4.224.186.213/evaluation-service/notifications";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Failed to fetch notifications (${response.status})`);

        const data = await response.json();

        const list = Array.isArray(data)
          ? data
          : Array.isArray(data.notifications)
          ? data.notifications
          : Array.isArray(data.data)
          ? data.data
          : [];

        setNotifications(list);
        setError("");
      } catch (err) {
        console.error(err);
        setError(err.message);
        setNotifications([]);
      } finally {
        setLoading(false);
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

  let list = [...notifications];

  list.sort((a, b) => {
    const aWeight = getW(a.type);
    const bWeight = getW(b.type);

    if (bWeight !== aWeight) {
      return bWeight - aWeight;
    }

    return new Date(b.timestamp) - new Date(a.timestamp);
  });

  list = list.slice(0, 10);

  if (filter !== "All") {
    list = list.filter((item) => String(item.type || "").toLowerCase() === filter.toLowerCase());
  }

  return (
    <div className="page">
      <h1>Campus Notifications</h1>

      <h2>Filter</h2>
      <NotificationFilter value={filter} onChange={setFilter} />

      <h2>Priority Inbox (Top 10)</h2>

      {loading ? (
        <p>Loading notifications...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : list.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        list.map((item) => (
          <div className="box" key={item.id ?? `${item.type}-${item.timestamp}`}>
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
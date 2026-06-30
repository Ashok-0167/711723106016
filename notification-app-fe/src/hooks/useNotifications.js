import { useEffect, useState } from "react";
import { fetchNotifications } from "../api/notifications";

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchNotifications();
        const list = Array.isArray(data) ? data : data.notifications || [];
        setNotifications(list);
      } catch {
        setError("Failed to load notifications");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { notifications, loading, error };
}

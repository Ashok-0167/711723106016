export function NotificationFilter({ value, onChange }) {
  return (
    <div className="filters">
      <button className={value === "All" ? "active" : ""} onClick={() => onChange("All")}>
        All
      </button>
      <button className={value === "Info" ? "active" : ""} onClick={() => onChange("Info")}>
        Info
      </button>
      <button
        className={value === "Events" ? "active" : ""}
        onClick={() => onChange("Events")}
      >
        Events
      </button>
      <button
        className={value === "Warnings" ? "active" : ""}
        onClick={() => onChange("Warnings")}
      >
        Warnings
      </button>
    </div>
  );
}

import { useState } from "react";
import { NotificationFilter } from "./components/NotificationFilter";

function App() {
  const [filter, setFilter] = useState("All");

  return (
    <div className="App">
      <NotificationFilter value={filter} onChange={setFilter} />
    </div>
  );
}

export default App;
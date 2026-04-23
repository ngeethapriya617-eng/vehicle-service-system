import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [components, setComponents] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [revenue, setRevenue] = useState([]);

  const fetchData = () => {
    axios
      .get("http://127.0.0.1:8000/api/components/")
      .then((res) => setComponents(res.data));

    axios
      .get("http://127.0.0.1:8000/api/vehicles/")
      .then((res) => setVehicles(res.data));

    axios
      .get("http://127.0.0.1:8000/api/revenue/")
      .then((res) => setRevenue(res.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalRevenue = revenue.reduce(
    (sum, item) => sum + Number(item.total),
    0
  );

  const pending = vehicles.filter(
    (item) => item.status === "Pending"
  ).length;

  return (
    <div className="section">
      <h2>Dashboard Overview</h2>

      <div className="grid">

        <div className="card">
          <h3>Total Components</h3>
          <p>{components.length}</p>
        </div>

        <div className="card">
          <h3>Total Vehicles</h3>
          <p>{vehicles.length}</p>
        </div>

        <div className="card">
          <h3>Pending Jobs</h3>
          <p>{pending}</p>
        </div>

        <div className="card">
          <h3>Total Revenue</h3>
          <p>₹{totalRevenue}</p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;   
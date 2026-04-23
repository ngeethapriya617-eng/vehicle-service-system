import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function ReportsPage() {
  const [daily, setDaily] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const [yearly, setYearly] = useState([]);

  const fetchData = () => {
    axios
      .get("http://127.0.0.1:8000/api/revenue/")
      .then((res) => setDaily(res.data));

    axios
      .get(
        "http://127.0.0.1:8000/api/revenue/monthly/"
      )
      .then((res) =>
        setMonthly(res.data)
      );

    axios
      .get(
        "http://127.0.0.1:8000/api/revenue/yearly/"
      )
      .then((res) =>
        setYearly(res.data)
      );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="section">
      <h2>
        Admin Analytics - Reports
      </h2>

      {/* Daily */}
      <h3>Daily Revenue</h3>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <LineChart data={daily}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#2563eb"
          />
        </LineChart>
      </ResponsiveContainer>

      <br />

      {/* Monthly */}
      <h3>Monthly Revenue</h3>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={monthly}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="total"
            fill="#16a34a"
          />
        </BarChart>
      </ResponsiveContainer>

      <br />

      {/* Yearly */}
      <h3>Yearly Revenue</h3>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={yearly}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="total"
            fill="#ea580c"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ReportsPage;
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink
} from "react-router-dom";

import "./App.css";

import Dashboard from "./pages/Dashboard";
import ComponentsPage from "./pages/ComponentsPage";
import VehiclesPage from "./pages/VehiclesPage";
import IssuesPage from "./pages/IssuesPage";
import ReportsPage from "./pages/ReportsPage";

function App() {
  return (
    <BrowserRouter>
      <div className="container">

        <div className="navbar">
          Vehicle Service Management
        </div>

        <div className="section">
          <div className="form-row">

            <NavLink to="/">
              <button>Dashboard</button>
            </NavLink>

            <NavLink to="/components">
              <button>Components</button>
            </NavLink>

            <NavLink to="/vehicles">
              <button>Vehicles</button>
            </NavLink>

            <NavLink to="/issues">
              <button>Technician</button>
            </NavLink>

            <NavLink to="/reports">
              <button>Reports</button>
            </NavLink>

          </div>
        </div>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/components" element={<ComponentsPage />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/issues" element={<IssuesPage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
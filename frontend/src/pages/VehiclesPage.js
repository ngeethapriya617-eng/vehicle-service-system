import React, { useEffect, useState } from "react";
import axios from "axios";

function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [issues, setIssues] = useState([]);
  const [search, setSearch] = useState("");

  const [vehicleForm, setVehicleForm] = useState({
    owner_name: "",
    vehicle_number: "",
    brand: "",
    model: "",
    issue_description: ""
  });

  const fetchData = () => {
    axios
      .get("http://127.0.0.1:8000/api/vehicles/")
      .then((res) => setVehicles(res.data));

    axios
      .get("http://127.0.0.1:8000/api/issues/")
      .then((res) => setIssues(res.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleVehicleSubmit = () => {
    axios
      .post(
        "http://127.0.0.1:8000/api/vehicles/",
        vehicleForm
      )
      .then(() => {
        fetchData();

        setVehicleForm({
          owner_name: "",
          vehicle_number: "",
          brand: "",
          model: "",
          issue_description: ""
        });
      });
  };

  const updateStatus = (id, status) => {
    axios
      .put("http://127.0.0.1:8000/api/vehicles/", {
        id,
        status
      })
      .then(() => fetchData());
  };

  const getVehicleBill = (vehicleId) => {
    const issue = issues.find(
      (item) => item.vehicle_id === vehicleId
    );

    return issue
      ? issue.final_price
      : 5000;
  };

  const makePayment = (vehicleId) => {
    axios
      .post("http://127.0.0.1:8000/api/payments/", {
        vehicle: vehicleId,
        amount: getVehicleBill(vehicleId)
      })
      .then(() => {
        alert("Payment Successful");
      });
  };

  const filteredVehicles = vehicles.filter((item) => {
    const text = search.toLowerCase();

    return (
      item.vehicle_number.toLowerCase().includes(text) ||
      item.owner_name.toLowerCase().includes(text) ||
      item.brand.toLowerCase().includes(text)
    );
  });

  return (
    <div className="section">
      <h2>Service Desk - Vehicles</h2>

      <div className="form-row">

        <input
          placeholder="Owner Name"
          value={vehicleForm.owner_name}
          onChange={(e) =>
            setVehicleForm({
              ...vehicleForm,
              owner_name: e.target.value
            })
          }
        />

        <input
          placeholder="Vehicle Number"
          value={vehicleForm.vehicle_number}
          onChange={(e) =>
            setVehicleForm({
              ...vehicleForm,
              vehicle_number:
                e.target.value
            })
          }
        />

        <input
          placeholder="Brand"
          value={vehicleForm.brand}
          onChange={(e) =>
            setVehicleForm({
              ...vehicleForm,
              brand: e.target.value
            })
          }
        />

        <input
          placeholder="Model"
          value={vehicleForm.model}
          onChange={(e) =>
            setVehicleForm({
              ...vehicleForm,
              model: e.target.value
            })
          }
        />

        <input
          placeholder="Issue Description"
          value={vehicleForm.issue_description}
          onChange={(e) =>
            setVehicleForm({
              ...vehicleForm,
              issue_description:
                e.target.value
            })
          }
        />

        <button
          onClick={handleVehicleSubmit}
        >
          Add Vehicle
        </button>

      </div>

      <br />

      <input
        placeholder="Search Vehicle..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <br /><br />

      <div className="grid">
        {filteredVehicles.map((item) => (
          <div
            key={item.id}
            className="card"
          >
            <h3>{item.vehicle_number}</h3>

            <p>
              Owner: {item.owner_name}
            </p>

            <p>
              {item.brand} - {item.model}
            </p>

            <p>
              Issue:{" "}
              {item.issue_description}
            </p>

            <p>
              Status: {item.status}
            </p>

            <select
              value={item.status}
              onChange={(e) =>
                updateStatus(
                  item.id,
                  e.target.value
                )
              }
            >
              <option value="Pending">
                Pending
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Completed">
                Completed
              </option>

              <option value="Delivered">
                Delivered
              </option>
            </select>

            <p><b>Billing Desk</b></p>

            <p>
              <b>
                Estimated Bill: ₹
                {getVehicleBill(item.id)}
              </b>
            </p>

            <button
              onClick={() =>
                makePayment(item.id)
              }
            >
              Pay Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VehiclesPage;
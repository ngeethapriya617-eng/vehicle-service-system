import React, { useEffect, useState } from "react";
import axios from "axios";

function IssuesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [components, setComponents] = useState([]);
  const [price, setPrice] = useState("");

  const [issueForm, setIssueForm] = useState({
  vehicle: "",
  component: "",
  issue_name: "",
  solution_type: "Repair",
  labor_charge: "",
  misc_charge: ""
});
  const fetchData = () => {
    axios
      .get("http://127.0.0.1:8000/api/vehicles/")
      .then((res) => setVehicles(res.data));

    axios
      .get("http://127.0.0.1:8000/api/components/")
      .then((res) => setComponents(res.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = () => {
        if (!issueForm.vehicle) {
            alert("Please select vehicle");
            return;
        }

        if (!issueForm.component) {
            alert("Please select component");
            return;
        }

        if (!issueForm.issue_name) {
            alert("Please enter issue name");
            return;
        }

        axios
            .post(
            "http://127.0.0.1:8000/api/issues/",
            issueForm
            )
            .then((res) => {
            setPrice(res.data.price);

            setIssueForm({
                vehicle: "",
                component: "",
                issue_name: "",
                solution_type: "Repair",
                labor_charge: "",
                misc_charge: ""
            });

            alert("Issue Saved");
            });
    };

  return (
    <div className="section">
      <h2>Technician Panel</h2>

      <div className="form-row">

        <select
          value={issueForm.vehicle}
          onChange={(e) =>
            setIssueForm({
              ...issueForm,
              vehicle: e.target.value
            })
          }
        >
          <option value="">
            Select Vehicle
          </option>

          {vehicles.map((item) => (
            <option
              key={item.id}
              value={item.id}
            >
              {item.vehicle_number}
            </option>
          ))}
        </select>

        <select
          value={issueForm.component}
          onChange={(e) =>
            setIssueForm({
              ...issueForm,
              component:
                e.target.value
            })
          }
        >
          <option value="">
            Select Component
          </option>

          {components.map((item) => (
            <option
              key={item.id}
              value={item.id}
            >
              {item.name}
            </option>
          ))}
        </select>

        <input
          placeholder="Issue Name"
          value={issueForm.issue_name}
          onChange={(e) =>
            setIssueForm({
              ...issueForm,
              issue_name:
                e.target.value
            })
          }
        />
        <input
            placeholder="Labor Charge"
            value={issueForm.labor_charge}
            onChange={(e) =>
                setIssueForm({
                ...issueForm,
                labor_charge: e.target.value
                })
            }
            />

            <input
            placeholder="Extra Charges"
            value={issueForm.misc_charge}
            onChange={(e) =>
                setIssueForm({
                ...issueForm,
                misc_charge: e.target.value
                })
            }
            />
        <select
          value={
            issueForm.solution_type
          }
          onChange={(e) =>
            setIssueForm({
              ...issueForm,
              solution_type:
                e.target.value
            })
          }
        >
          <option value="Repair">
            Repair
          </option>

          <option value="Replace">
            Replace
          </option>
        </select>

        <button onClick={handleSubmit}>
          Save Issue
        </button>

      </div>

      <br />

      <div className="price">
        Estimated Price: ₹{price}
      </div>
    </div>
  );
}

export default IssuesPage;
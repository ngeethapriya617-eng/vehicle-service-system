import React, { useEffect, useState } from "react";
import axios from "axios";

function ComponentsPage() {
  const [components, setComponents] = useState([]);

  const [form, setForm] = useState({
    name: "",
    component_type: "",
    purchase_price: "",
    repair_price: "",
    stock: ""
  });

  const fetchComponents = () => {
    axios
      .get("http://127.0.0.1:8000/api/components/")
      .then((res) => setComponents(res.data));
  };

  useEffect(() => {
    fetchComponents();
  }, []);

  const handleSubmit = () => {
    axios
      .post(
        "http://127.0.0.1:8000/api/components/",
        form
      )
      .then(() => {
        fetchComponents();

        setForm({
          name: "",
          component_type: "",
          purchase_price: "",
          repair_price: "",
          stock: ""
        });
      });
  };

  return (
    <div className="section">
      <h2>Admin Panel - Components</h2>

      <div className="form-row">

        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value
            })
          }
        />

        <input
          placeholder="Type"
          value={form.component_type}
          onChange={(e) =>
            setForm({
              ...form,
              component_type:
                e.target.value
            })
          }
        />

        <input
          placeholder="Purchase Price"
          value={form.purchase_price}
          onChange={(e) =>
            setForm({
              ...form,
              purchase_price:
                e.target.value
            })
          }
        />

        <input
          placeholder="Repair Price"
          value={form.repair_price}
          onChange={(e) =>
            setForm({
              ...form,
              repair_price:
                e.target.value
            })
          }
        />

        <input
          placeholder="Stock"
          value={form.stock}
          onChange={(e) =>
            setForm({
              ...form,
              stock: e.target.value
            })
          }
        />

        <button onClick={handleSubmit}>
          Add Component
        </button>

      </div>

      <br />

      <div className="grid">
        {components.map((item) => (
          <div
            key={item.id}
            className="card"
          >
            <h3>{item.name}</h3>

            <p>
              Type:{" "}
              {item.component_type}
            </p>

            <p>
              Purchase: ₹
              {item.purchase_price}
            </p>

            <p>
              Repair: ₹
              {item.repair_price}
            </p>

            <p>
              Stock: {item.stock}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComponentsPage;
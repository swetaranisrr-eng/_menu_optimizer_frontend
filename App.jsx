import React, { useState } from "react";
import axios from "axios";
import { FaPepperHot, FaRupeeSign, FaUtensils, FaCookieBite, FaHamburger } from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";
import "./App.css";

const steps = [
  { label: "Favorite Cuisine", icon: <MdRestaurantMenu size={40} className="text-red-500" /> },
  { label: "Spice Level", icon: <FaPepperHot size={40} className="text-orange-500" /> },
  { label: "Budget", icon: <FaRupeeSign size={40} className="text-green-600" /> },
  { label: "Sweet Tooth", icon: <FaCookieBite size={40} className="text-yellow-500" /> },
  { label: "Eating Out", icon: <FaHamburger size={40} className="text-pink-500" /> }
];

function App() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    Cuisine_top1: "",
    Spice_Tolerance: "",
    Food_Budget: "",
    Sweet_Tooth_Level: "",
    Eating_Out: ""
  });

  const [prediction, setPrediction] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const next = () => step < 4 && setStep(step + 1);
  const prev = () => step > 0 && setStep(step - 1);

  const handleSubmit = async () => {
    setLoading(true);
    setPrediction("");

    try {
      const res = await axios.post("http://localhost:5000/predict", formData);
      setPrediction(res.data.prediction);
    } catch (err) {
      setPrediction("Backend connection error.");
    }

    setLoading(false);
  };

  return (
    <div className="hero-wrapper">

      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80"
        className="hero-bg"
        alt="food"
      />

      {/* Main Card */}
      <div className="hero-card">
        
        <h1 className="hero-title">
          🍛 Dietary Preference Predictor
        </h1>

        {/* Progress Bar */}
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          ></div>
        </div>

        {/* Step Icon */}
        <div className="step-icon">{steps[step].icon}</div>

        {/* Step Title */}
        <h2 className="step-title">{steps[step].label}</h2>

        {/* Inputs */}
        {step === 0 && (
          <input
            type="text"
            name="Cuisine_top1"
            placeholder="e.g. Indian, Italian"
            onChange={handleChange}
            className="input-box"
          />
        )}

        {step === 1 && (
          <input
            type="number"
            name="Spice_Tolerance"
            placeholder="1 to 5"
            onChange={handleChange}
            className="input-box"
          />
        )}

        {step === 2 && (
          <input
            type="number"
            name="Food_Budget"
            placeholder="₹ Budget per meal"
            onChange={handleChange}
            className="input-box"
          />
        )}

        {step === 3 && (
          <input
            type="number"
            name="Sweet_Tooth_Level"
            placeholder="1 to 5"
            onChange={handleChange}
            className="input-box"
          />
        )}

        {step === 4 && (
          <input
            type="number"
            name="Eating_Out"
            placeholder="Times per week"
            onChange={handleChange}
            className="input-box"
          />
        )}

        {/* Navigation Buttons */}
        <div className="button-row">
          {step > 0 ? (
            <button onClick={prev} className="btn btn-back">
              ← Back
            </button>
          ) : (
            <div></div>
          )}

          {step < 4 ? (
            <button onClick={next} className="btn btn-next">
              Next →
            </button>
          ) : (
            <button onClick={handleSubmit} className="btn btn-predict">
              Predict ✅
            </button>
          )}
        </div>

        {/* Spinner */}
        {loading && (
          <div className="spinner"></div>
        )}

        {/* Prediction */}
        {prediction && (
          <div className="prediction-box">
            <h3>🍽 Prediction:</h3>
            <p className="prediction-text">{prediction}</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;

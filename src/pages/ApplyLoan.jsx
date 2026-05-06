import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ApplyLoan.css';

const ApplyLoan = () => {
    const navigate = useNavigate();
      const [formData, setFormData] = useState({
        name: "",
        email: "",
        amount: "",
        tenure: "",
        purpose: "",
        interestRate: ""
      });
      const [error, setError] = useState("");
      const [loading, setLoading] = useState(false);
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.name.trim() || !formData.email.trim() || formData.amount === "" || !formData.tenure.trim() || !formData.purpose.trim() || formData.interestRate === "") {
          setError("Please fill in all fields");
          return;
        }
          

        setLoading(true);

    try {
      const response = await fetch("https://loanaptech-sltw.onrender.com/api/loans/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          amount: formData.amount,
          purpose: formData.purpose,
          duration: formData.tenure,
          interestRate: formData.interestRate
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Application failed");
      }

      alert("Loan application submitted successfully!");

      navigate("/loans");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="apply-container">
      <div className="apply-card">
        <h1 className="apply-title">Apply for a Loan</h1>

        <form className="apply-form" onSubmit={handleSubmit}>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Loan Amount</label>
            <input
              type="number"
              name="amount"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Interest Rate (%)</label>
            <input
              type="number"
              name="interestRate"
              placeholder="Enter interest rate"
              value={formData.interestRate}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
             <label>Loan Tenure (months)</label>
             <select
               name="tenure"
               value={formData.tenure}
               onChange={handleChange}
            >   
             <option value="">Select tenure</option>
            <option value="12">12 months</option>
            <option value="24">24 months</option>
            <option value="36">36 months</option>
            <option value="60">60 months</option>
            </select>
         </div>

          <div className="input-group">
            <label>Purpose of Loan</label>
            <textarea
              name="purpose"
              placeholder="Why do you need this loan?"
              value={formData.purpose}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="apply-submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Submit Application"}
          </button>

        </form>
      </div>
    </div>

  );

}

export default ApplyLoan;
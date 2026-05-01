import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ApplyLoan.css';

const ApplyLoan = () => {
    const navigate = useNavigate();
      const [formData, setFormData] = useState({
        name: "",
        email: "",
        loanAmount: "",
        loanTenure: "",
        purposeLoan: ""
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

        if (!formData.name || !formData.email || !formData.loanAmount || !formData.loanTenure || !formData.purposeLoan) {
          setError("Please fill in all fields");
          return;
        }


        setLoading(true);

    try {
      const response = await fetch("https://loanaptech-sltw.onrender.com/api/auth/apply-loan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          loanAmount: formData.loanAmount,
          loanTenure: formData.loanTenure,
          purposeLoan: formData.purposeLoan
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
              name="loanAmount"
              placeholder="Enter amount"
              value={formData.loanAmount}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
             <label>Loan Tenure Type</label>
             <select
               name="loanTenure"
               value={formData.loanTenure}
               onChange={handleChange}
            >   
             <option value="">Select tenure type</option>
            <option value="annual">Annual</option>
            <option value="semiannual">Semiannual (Every 6 months)</option>
            <option value="quarterly">Quarterly (Every 3 months)</option>
            </select>
         </div>

          <div className="input-group">
            <label>Purpose of Loan</label>
            <textarea
              name="purposeLoan"
              placeholder="Why do you need this loan?"
              value={formData.purposeLoan}
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
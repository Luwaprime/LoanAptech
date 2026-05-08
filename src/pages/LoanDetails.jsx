import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./LoanDetails.css";

function LoanDetails() {
  const { id } = useParams();
  const [loan, setLoan] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLoan();
  }, []);

  const fetchLoan = async () => {
    try {
      const res = await fetch(`https://loanaptech-sltw.onrender.com/api/loans/${id}`, {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Loan not found");
        return;
      }
      setLoan(data.loan);
    } catch (err) {
      console.error(err);
      setError("Failed to load loan");
    }
  };

  const formatAmount = (amount) =>
    new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 })
      .format(amount)
      .replace("NGN", "₦");

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-NG", {
      day: "numeric", month: "long", year: "numeric",
    });

  if (error) {
    return (
      <div className="loan-notfound">
        <div className="notfound-card">
          <h2>Loan Not Found</h2>
          <p>{error}</p>
          <Link to="/dashboard" className="notfound-btn">Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  if (!loan) {
    return (
      <div className="loan-notfound">
        <div className="notfound-card">
          <h2 style={{ color: "#4f46e5" }}>Loading...</h2>
          <p>Fetching your loan details, please wait.</p>
        </div>
      </div>
    );
  }

  const statusClass = loan.status === "approved" ? "approved" : loan.status === "rejected" ? "rejected" : "";
  const statusEmoji = loan.status === "approved" ? "✓" : loan.status === "rejected" ? "✕" : "⏳";

  return (
    <div className="details-container">
      <div className="details-card">

        {/* Header */}
        <div className={`details-header ${statusClass}`}>
          <h1>Loan Application</h1>
          <div className="status-badge">
            {statusEmoji} {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
          </div>
        </div>
        

        {/* Loan ID */}
        <div className="details-id">
          Loan Reference <span className="id-number">#{loan._id.slice(-8).toUpperCase()}</span>
        </div>

        {/* Details Grid */}
        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">Loan Amount</span>
            <span className="detail-value detail-amount">{formatAmount(loan.amount)}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Duration</span>
            <span className="detail-value">{loan.duration} months</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Monthly Payment</span>
            <span className="detail-value">{formatAmount(loan.monthlyPayment)}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Total Repayment</span>
            <span className="detail-value">{formatAmount(loan.totalPayment)}</span>
          </div>

          {loan.interestRate && (
            <div className="detail-item">
              <span className="detail-label">Interest Rate</span>
              <span className="detail-value">{loan.interestRate}% p.a.</span>
            </div>
          )}

          {loan.createdAt && (
            <div className="detail-item details-date">
              <span className="detail-label">Date Applied</span>
              <span className="detail-value">{formatDate(loan.createdAt)}</span>
            </div>
          )}
        </div>

        {/* Purpose */}
        {loan.purpose && (
          <div className="details-section">
            <span className="detail-label">Purpose</span>
            <p className="details-text">{loan.purpose}</p>
          </div>
        )}

        {/* Actions */}
        <div className="details-actions">
          <Link to="/dashboard" className="btn-dashboard">Back to Dashboard</Link>
          <Link to="/apply" className="btn-secondary">Apply for Another</Link>
        </div>

      </div>
    </div>
  );
}

export default LoanDetails;
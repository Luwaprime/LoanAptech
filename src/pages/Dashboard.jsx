// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      // Fetch current user
      const userResponse = await fetch("https://loanaptech-sltw.onrender.com/api/auth/me", {
        credentials: "include"
      });

      if (!userResponse.ok) {
        throw new Error("Not authenticated");
      }

      const userData = await userResponse.json();
      setUser(userData.user);

      // Fetch dashboard stats
      const statsResponse = await fetch("https://loanaptech-sltw.onrender.com/api/loans/dashboard/stats", {
        credentials: "include"
      });

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData.stats);
      }

      // Fetch my loans
      const loansResponse = await fetch("https://loanaptech-sltw.onrender.com/api/loans/my-loans", {
        credentials: "include"
      });

      if (loansResponse.ok) {
        const loansData = await loansResponse.json();
        setLoans(loansData.loans);
      }

    } catch (err) {
      console.error(err);
      setError(err.message);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("https://loanaptech-sltw.onrender.com/api/auth/logout", {
        method: "POST",
        credentials: "include"
      });
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleApplyLoan = () => {
    navigate("/apply-loan");
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          {user && <div className="user-info">Welcome, {user.name}</div>}
        </div>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Loans</h3>
            <div className="stat-value">{stats.totalLoans}</div>
          </div>
          <div className="stat-card">
            <h3>Pending</h3>
            <div className="stat-value">{stats.pendingLoans}</div>
          </div>
          <div className="stat-card">
            <h3>Approved</h3>
            <div className="stat-value">{stats.approvedLoans}</div>
          </div>
          <div className="stat-card">
            <h3>Active</h3>
            <div className="stat-value">{stats.activeLoans}</div>
          </div>
          <div className="stat-card">
            <h3>Total Borrowed</h3>
            <div className="stat-value">
              ₱{stats.totalBorrowed?.toLocaleString()}
            </div>
          </div>
          <div className="stat-card">
            <h3>Total Repayment</h3>
            <div className="stat-value">
              ₱{stats.totalRepayment?.toLocaleString()}
            </div>
          </div>
        </div>
      )}

      <div className="dashboard-content">
        <div className="content-header">
          <h2>My Loans</h2>
          <button className="apply-loan-btn" onClick={handleApplyLoan}>
            Apply for New Loan
          </button>
        </div>

        {loans.length > 0 ? (
          <table className="loans-table">
            <thead>
              <tr>
                <th>Amount</th>
                <th>Purpose</th>
                <th>Duration</th>
                <th>Monthly Payment</th>
                <th>Status</th>
                <th>Applied Date</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan._id}>
                  <td>₱{loan.amount?.toLocaleString()}</td>
                  <td>{loan.purpose}</td>
                  <td>{loan.duration} months</td>
                  <td>₱{parseFloat(loan.monthlyPayment)?.toLocaleString()}</td>
                  <td>
                    <span className={`status-badge ${loan.status}`}>
                      {loan.status}
                    </span>
                  </td>
                  <td>{new Date(loan.appliedDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-loans">
            You haven't applied for any loans yet. Click the button above to get started!
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
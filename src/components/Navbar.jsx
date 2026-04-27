import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {

    checkAuth();
  }, [location]); 

  const checkAuth = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        credentials: "include"
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    }
  };

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include"
      });

      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-logo">
          LoanAptech
        </Link>

        {/* Desktop Menu */}
        <ul className="navbar-menu">
          <li>
            <Link to="/" className={isActive("/") ? "nav-link active" : "nav-link"}>
              Home
            </Link>
          </li>

          <li>
            <Link to="/loans" className={isActive("/loans") ? "nav-link active" : "nav-link"}>
              Loans
            </Link>
          </li>

          <li>
            <Link to="/about" className={isActive("/about") ? "nav-link active" : "nav-link"}>
              About
            </Link>
          </li>

          <li>
            <Link to="/contact" className={isActive("/contact") ? "nav-link active" : "nav-link"}>
              Contact
            </Link>
          </li>

          {/* Logged-in only */}
          {user && (
            <li>
              <Link to="/apply" className={isActive("/apply") ? "nav-link active" : "nav-link"}>
                Apply Now
              </Link>
            </li>
          )}

          {user && (
            <li>
              <Link to="/dashboard" className="nav-cta">
                Dashboard
              </Link>
            </li>
          )}

          {/* Logged-out only */}
          {!user && (
            <>
              <li>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>

              <li>
                <Link to="/signup" className="nav-cta">
                  Sign Up
                </Link>
              </li>
            </>
          )}

          {/* Logout */}
          {user && (
            <li>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </li>
          )}
        </ul>

        {/* Mobile Toggle */}
        <div
          className="navbar-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <Link to="/" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
          Home
        </Link>

        <Link to="/loans" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
          Loans
        </Link>

        <Link to="/about" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
          About
        </Link>

        <Link to="/contact" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
          Contact
        </Link>

        {user && (
          <Link to="/apply" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
            Apply Now
          </Link>
        )}

        {user && (
          <Link to="/dashboard" className="mobile-cta" onClick={() => setMobileMenuOpen(false)}>
            Dashboard
          </Link>
        )}

        {!user && (
          <>
            <Link to="/login" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
              Login
            </Link>

            <Link to="/signup" className="mobile-cta" onClick={() => setMobileMenuOpen(false)}>
              Sign Up
            </Link>
          </>
        )}

        {user && (
          <button
            className="mobile-logout"
            onClick={() => {
              handleLogout();
              setMobileMenuOpen(false);
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
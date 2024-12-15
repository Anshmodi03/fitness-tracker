import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import { Button } from "primereact/button"; // Import Button from PrimeReact
import "./Header.css"; // Importing custom CSS

const Header = () => {
  return (
    <div className="header-container">
      <div className="logo-container">
        <img
          src="/logo-name.png"
          alt="ACT4 FITNESS Logo"
          className="header-logo"
        />
      </div>
      <nav className="nav-container">
        <Link to="/" className="nav-link">
          <Button
            label="Home"
            className="nav-button p-button-outlined p-button-text"
          />
        </Link>
        <Link to="/activity-log" className="nav-link">
          <Button
            label="Activity Log"
            className="nav-button p-button-outlined p-button-text"
          />
        </Link>
        <Link to="/fitness-stats" className="nav-link">
          <Button
            label="My Stats"
            className="nav-button p-button-outlined p-button-text"
          />
        </Link>
      </nav>
    </div>
  );
};

export default Header;

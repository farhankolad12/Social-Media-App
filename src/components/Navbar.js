import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Farhanogram
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <CustomLink to="/" child="Home" />
            <CustomLink to="/profile" child="Profile" />
            <button
              onClick={() => logout()}
              className="btn btn-outline-light ms-4"
            >
              Logout
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function CustomLink({ to, child }) {
  const currentPath = useResolvedPath(to);
  const isActive = useMatch({ path: currentPath.pathname, end: true });
  return (
    <li className="nav-item">
      <Link className={`nav-link ${isActive ? "active" : ""}`} to={to}>
        {child}
      </Link>
    </li>
  );
}

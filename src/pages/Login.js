import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate();

  const { login, currentUser } = useAuth();

  useEffect(() => {
    currentUser && navigate("/");
  }, [currentUser, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const pass = passRef.current.value;

    if (email === "" || pass === "")
      return setError("All fields are required!");

    try {
      setLoading(true);
      await login(email, pass);
      setLoading(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
      if (err.code === "auth/user-not-found")
        return setError(`User Not Found with email ${email}`);

      if (err.code === "auth/wrong-password")
        return setError("Email/password is wrong!");

      return setError(err.code);
    }
  }

  return (
    <div className="auth">
      <div className="card bg-dark text-light">
        <h3 className="text-center mt-3">Login</h3>
        {error !== "" && (
          <div
            className="alert alert-danger alert-dismissible fade show m-3"
            role="alert"
          >
            <i className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" />
            <strong>Error!</strong> {error}
          </div>
        )}
        <div className="px-3">
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="form-label mt-2">
              Email
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="Enter Email"
              id="email"
              ref={emailRef}
            />
            <label htmlFor="pass1" className="form-label mt-2">
              Enter Password
            </label>
            <input
              className="form-control"
              type="password"
              placeholder="Enter Password"
              id="pass1"
              ref={passRef}
            />
            <button
              disabled={loading}
              className="btn btn-outline-light w-100 mt-3"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
        <p className="text-center my-3">
          Not a member? <Link to="/signup">Sign Up</Link>{" "}
        </p>
      </div>
    </div>
  );
}

import { serverTimestamp } from "firebase/firestore";
import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { addUserToData } from "../utils/helper";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const nameRef = useRef();
  const emailRef = useRef();
  const passRef1 = useRef();
  const passRef2 = useRef();
  const navigate = useNavigate();
  const { signup, currentUser } = useAuth();

  useEffect(() => {
    currentUser && navigate("/");
  }, [currentUser, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const pass1 = passRef1.current.value;
    const pass2 = passRef2.current.value;

    if (name === "" || email === "" || pass1 === "" || pass2 === "")
      return setError("All fields are required!");

    if (pass1 !== pass2) return setError("Password don't match!");

    try {
      setLoading(true);
      await signup(email, pass1).then(async (snapshot) => {
        const payload = {
          uid: snapshot.user.uid,
          createdAt: serverTimestamp(),
          name,
          photoURL: null,
          email,
          bio: "",
          followers: [],
          following: [snapshot.user.uid],
        };
        await addUserToData(snapshot, payload);
      });
      navigate("/");
      setError("");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
      if (err.code === "auth/weak-password")
        return setError(
          "Very weak password, password should be atleast 8 characters long!"
        );

      if (err.code === "auth/email-already-in-use")
        return setError("User is already registered");

      return setError(err.code ? err.code : err);
    }
  }

  return (
    <div className="auth">
      <div className="card bg-dark text-light">
        <h3 className="text-center mt-3">Sign Up</h3>
        {error !== "" && (
          <div
            className="alert alert-danger alert-dismissible fade show m-3"
            role="alert"
          >
            <i className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" />
            <strong>Error!</strong> {error}
          </div>
        )}
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name" className="form-label">
              Enter Name
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="Enter Name"
              id="name"
              ref={nameRef}
            />
            <label htmlFor="email" className="form-label mt-2">
              Email
            </label>
            <input
              className="form-control"
              type="email"
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
              ref={passRef1}
            />
            <label htmlFor="pass2" className="form-label mt-2">
              Confrim Password
            </label>
            <input
              className="form-control"
              type="password"
              placeholder="Confirm Password"
              id="pass2"
              ref={passRef2}
            />
            <button
              disabled={loading}
              className="btn btn-outline-light w-100 mt-3"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </form>
        </div>
        <p className="text-center">
          Already a member? <Link to="/login">Login</Link>{" "}
        </p>
      </div>
    </div>
  );
}

import React from "react";

export default function ProfileImg({ post }) {
  return post.photoURL ? (
    <img
      src={post.photoURL}
      style={{ borderRadius: "50%", width: "50px", height: "50px" }}
      alt="Profile"
    />
  ) : (
    <span
      className="bg-dark d-flex align-items-center justify-content-center"
      style={{
        width: "50px",
        height: "50px",
        borderRadius: "50%",
      }}
    >
      <i className="bi bi-person-fill fs-3 text-light" />
    </span>
  );
}

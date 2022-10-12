import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { addFollow, removeFollow } from "../utils/helper";
import ProfileImg from "./ProfileImg";

export default function User({ user }) {
  const [loading, setLoading] = useState(false);

  const { currentUser } = useAuth();
  const { followers, uid, name } = user;

  const isFollowed = followers.some((uid) => uid === currentUser.uid);

  async function handleFollow() {
    try {
      setLoading(true);
      if (isFollowed) {
        await removeFollow(user, currentUser);
      } else {
        await addFollow(user, currentUser);
      }
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }

  return (
    <div className="d-flex justify-content-between align-items-center mt-2">
      <div className="d-flex gap-4 align-items-center">
        {<ProfileImg post={user} />}
        <Link to={`/user-profile/${uid}`}>{name}</Link>
      </div>
      {isFollowed ? (
        <button
          onClick={() => handleFollow(followers)}
          className="btn btn-warning"
          disabled={loading}
        >
          {loading ? "..." : "Following"}
        </button>
      ) : (
        <button
          onClick={() => handleFollow(followers)}
          className="btn btn-success"
          disabled={loading}
        >
          {loading ? "..." : "Follow"}
        </button>
      )}
    </div>
  );
}

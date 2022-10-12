import React, { useState } from "react";
import Post from "../components/Post";
import ProfileImg from "../components/ProfileImg";
import FollowProfile from "./FollowProfile";
import { removeFollow, addFollow } from "../utils/helper";
import { useAuth } from "../context/AuthContext";

export default function ProfileInfo({ posts, userInfo }) {
  const [loading1, setLoading] = useState(false);

  const { currentUser } = useAuth();

  const { followers, name, email, bio, createdAt, following, uid } = userInfo;

  const isFollowed =
    followers && followers.some((uid) => uid === currentUser.uid);

  async function handleFollow() {
    try {
      setLoading(true);
      if (isFollowed) {
        await removeFollow(userInfo, currentUser);
      } else {
        await addFollow(userInfo, currentUser);
      }
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }

  return (
    <main className="profile-page mt-3">
      <div className="bg-dark container p-4 w-50">
        <h4>Profile</h4>
        <div className="d-flex justify-content-between align-items-center mt-3 border-bottom border-success pb-3">
          <div className="d-flex align-items-center gap-3">
            <ProfileImg post={userInfo} />
            <div className="w-100">
              <span className="w-100">{name}</span>
              <br />
              <span className="text-muted">{email}</span>
            </div>
          </div>
          <div>
            {isFollowed ? (
              <button
                onClick={() => handleFollow()}
                className="btn btn-warning"
                disabled={loading1}
              >
                {loading1 ? "..." : "Following"}
              </button>
            ) : (
              <button
                onClick={() => handleFollow()}
                className="btn btn-success"
                disabled={loading1}
              >
                {loading1 ? "..." : "Follow"}
              </button>
            )}
          </div>
        </div>
        <div>
          <span>{bio}</span>
          <br />
          <span className="text-muted ">
            Joined:{" "}
            {createdAt && new Date(createdAt.seconds * 1000).toDateString()}
          </span>
        </div>
        <ul
          className="nav nav-pills my-3 d-flex justify-content-center align-items-center"
          id="pills-tab"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="pills-posts-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-posts"
              type="button"
              role="tab"
              aria-controls="pills-posts"
              aria-selected="true"
            >
              Posts
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-following-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-following"
              type="button"
              role="tab"
              aria-controls="pills-following"
              aria-selected="false"
            >
              Following ({following && following.length - 1})
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-followers-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-followers"
              type="button"
              role="tab"
              aria-controls="pills-followers"
              aria-selected="false"
            >
              Followers ({followers && followers.length})
            </button>
          </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-posts"
            role="tabpanel"
            aria-labelledby="pills-posts-tab"
          >
            {posts ? (
              posts.map((post) => {
                return <Post key={post.id} post={post} />;
              })
            ) : (
              <div>Loading...</div>
            )}
          </div>
          <div
            className="tab-pane fade"
            id="pills-following"
            role="tabpanel"
            aria-labelledby="pills-following-tab"
          >
            <div className="d-flex flex-wrap">
              {following &&
                following.map((u) => {
                  return u !== uid && <FollowProfile uid={u} key={u} />;
                })}
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="pills-followers"
            role="tabpanel"
            aria-labelledby="pills-followers-tab"
          >
            <div className="d-flex flex-wrap gap-4">
              {followers &&
                followers.map((u) => {
                  return <FollowProfile uid={u} key={u} />;
                })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

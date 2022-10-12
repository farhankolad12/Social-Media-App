import React, { useState } from "react";
import ProfileImg from "../components/ProfileImg";
import { useAuth } from "../context/AuthContext";
import useUserData from "../hooks/useUserData";
import Post from "../components/Post";
import useUserPost from "../hooks/useUserPost";
import { useNavigate } from "react-router-dom";
import { deleteUserAndPosts } from "../utils/helper";
import FollowProfile from "../components/FollowProfile";

export default function Profile() {
  const [loadingDel, setLoadingDel] = useState(false);

  const { currentUser } = useAuth();
  const { post } = useUserPost(currentUser.uid);
  const { info } = useUserData(currentUser.uid);

  const navigate = useNavigate();

  function goToEdit() {
    return navigate("/edit");
  }

  async function handleDelete() {
    try {
      setLoadingDel(true);
      await deleteUserAndPosts(info, currentUser);
      setLoadingDel(false);
    } catch (error) {
      setLoadingDel(false);

      alert(error);
    }
  }

  return (
    <main className="profile-page mt-3">
      <div className="bg-dark container p-4 w-50">
        <h4>Profile</h4>
        <div className="d-flex justify-content-between align-items-center mt-3 border-bottom border-success pb-3">
          <div className="d-flex align-items-center gap-3">
            <ProfileImg post={info} />
            <div className="w-100">
              <span className="w-100">{info.name}</span>
              <br />
              <span className="text-muted">{info.email}</span>
            </div>
          </div>
          <div>
            <button className="btn" onClick={goToEdit}>
              <i className="bi bi-pen-fill text-success" />
            </button>
            <button
              disabled={loadingDel}
              onClick={handleDelete}
              className="btn"
            >
              {loadingDel ? (
                "..."
              ) : (
                <i className="bi bi-trash-fill text-danger" />
              )}
            </button>
          </div>
        </div>
        <div>
          <span>{info.bio}</span>
          <br />
          <span className="text-muted ">
            Joined:{" "}
            {info.createdAt &&
              new Date(info.createdAt.seconds * 1000).toDateString()}
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
              Following ({info.following && info.following.length - 1})
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
              Followers ({info.followers && info.followers.length})
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
            {post.map((ps) => {
              return <Post key={ps.id} post={ps} />;
            })}
          </div>
          <div
            className="tab-pane fade"
            id="pills-following"
            role="tabpanel"
            aria-labelledby="pills-following-tab"
          >
            <div className="d-flex flex-wrap">
              {info.following &&
                info.following.map((u) => {
                  return (
                    u !== currentUser.uid && <FollowProfile uid={u} key={u} />
                  );
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
              {info.followers &&
                info.followers.map((u) => {
                  return <FollowProfile uid={u} key={u} />;
                })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

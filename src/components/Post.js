import React, { useState, useRef } from "react";
import { Timestamp } from "firebase/firestore";
import Comment from "./Comment";
import ProfileImg from "./ProfileImg";
import { removeLikes, addLikes, addCommentsToPost } from "../utils/helper";
import { Link } from "react-router-dom";
import useUserData from "../hooks/useUserData";
import { useAuth } from "../context/AuthContext";

export default function Post({ post }) {
  const [error, setError] = useState("");

  const { text, postedAt, imgURL, id, likes, comments } = post;

  const { info } = useUserData(post.uid);
  const { currentUser } = useAuth();
  const commentRef = useRef();

  const isLiked = likes.some((like) => like === currentUser.uid);
  async function handleLike(postId) {
    try {
      if (isLiked) {
        await removeLikes(postId, currentUser);
      } else {
        await addLikes(postId, currentUser);
      }
    } catch {
      setError("Something Went Wrong!");
    }
  }

  async function handleComment(e, postId) {
    e.preventDefault();
    const id = Math.floor(Math.random() * 999999);
    const commentText = commentRef.current.value;
    if (commentText === "") return alert("Please type something!");

    const comment = {
      id,
      text: commentText,
      uid: currentUser.uid,
      commentedAt: Timestamp.now(),
    };

    try {
      await addCommentsToPost(comment, postId);
    } catch (err) {
      setError(err);
    }

    e.target.reset();
  }

  return (
    <>
      {error && alert(error)}

      <div
        className="container p-3  text-light"
        style={{ backgroundColor: "#333" }}
      >
        <div className="border-top border-start border-end border-dark d-flex align-items-center gap-3 p-2 ">
          <ProfileImg post={info} />
          <div>
            <Link to={`/user-profile/${info.uid}`}>{info.name}</Link>
            <br />
            <span className="text-muted">
              {postedAt && new Date(postedAt.seconds * 1000).toDateString()}
            </span>
          </div>
        </div>
        <div className="bg-dark p-2">{text}</div>
        {imgURL && (
          <div>
            <img src={imgURL} alt="Posts" width="100%" height="400px" />
          </div>
        )}
        <div className="border border-dark p-3 d-flex gap-4 align-items-center">
          <div>
            <button className="btn" onClick={() => handleLike(id.toString())}>
              <i
                className={`bi bi-heart${isLiked ? "-fill" : ""} text-danger`}
              />
            </button>
            <span>{likes.length}</span>
          </div>
          <div>
            <i className="bi bi-chat-right-text-fill"></i>
            <span className="ms-3">{comments.length}</span>
          </div>
        </div>
        <div className="border border-dark p-3">
          <form onSubmit={(e) => handleComment(e, id)}>
            <div className="d-flex gap-2 align-items-center">
              <ProfileImg post={info} />
              <input
                type="text"
                placeholder="Say something about this post..."
                className="form-control bg-dark text-light"
                ref={commentRef}
              />
            </div>
          </form>
          {comments.map((comment) => {
            return <Comment key={comment.id} comment={comment} />;
          })}
        </div>
      </div>
    </>
  );
}

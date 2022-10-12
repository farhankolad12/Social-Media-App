import React from "react";
import { Link } from "react-router-dom";
import useUserData from "../hooks/useUserData";
import ProfileImg from "./ProfileImg";

export default function Comment({ comment }) {
  const { info } = useUserData(comment.uid);

  return (
    <>
      <div className="d-flex gap-4 align-items-center my-3">
        <ProfileImg post={info} />
        <div className="bg-dark w-100 p-3">
          <Link to={`/user-profile/${info.uid}`} className="w-100 text-primary">
            {info.name}
          </Link>
          <br />
          <span className="w-100 text-light">{comment.text}</span>
          <br />
          <span className="w-100 text-muted">
            {comment.commentedAt &&
              new Date(comment.commentedAt.seconds * 1000).toDateString()}
            &nbsp; |
          </span>
        </div>
      </div>
    </>
  );
}

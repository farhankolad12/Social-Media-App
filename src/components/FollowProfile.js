import React from "react";
import { Link } from "react-router-dom";
import useUserData from "../hooks/useUserData";
import ProfileImg from "./ProfileImg";

export default function FollowProfile({ uid }) {
  const { info } = useUserData(uid);

  return info ? (
    <div className="d-flex flex-column ms-4 align-items-center justify-content-center">
      <ProfileImg post={info} />
      <Link to={`/user-profile/${info.uid}`}>{info.name}</Link>
    </div>
  ) : (
    ""
  );
}

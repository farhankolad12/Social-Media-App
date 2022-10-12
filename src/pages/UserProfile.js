import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProfileInfo from "../components/ProfileInfo";
import useUserPost from "../hooks/useUserPost";
import useUserData from "../hooks/useUserData";

export default function UserProfile() {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const isCurrentUser = currentUser.uid === id;

  const { post } = useUserPost(id);
  const { info } = useUserData(id);

  return isCurrentUser ? (
    <Navigate to="/profile" />
  ) : info ? (
    <ProfileInfo userInfo={info} posts={post} />
  ) : (
    ""
  );
}

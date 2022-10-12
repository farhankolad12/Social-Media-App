import React from "react";
import { useAuth } from "../context/AuthContext";
import useUserData from "../hooks/useUserData";
import User from "./User";

export default function AllUsers() {
  const { currentUser } = useAuth();
  const { allUsers } = useUserData(currentUser.uid);

  return (
    <div className="w-75 bg-dark container h-100 p-3">
      <span>Who to follow</span>
      <div className="p-3">
        {allUsers.map((user) => {
          return user.uid !== currentUser.uid ? (
            <User key={user.uid} user={user} />
          ) : (
            ""
          );
        })}
      </div>
    </div>
  );
}

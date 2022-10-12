import React from "react";
import Post from "./Post";
import useUserPost from "../hooks/useUserPost";
import { useAuth } from "../context/AuthContext";
import useUserData from "../hooks/useUserData";

export default function AllPosts() {
  const { currentUser } = useAuth();
  const { allPosts } = useUserPost(currentUser.uid);
  const { info } = useUserData(currentUser.uid);

  // Getting Post Of User That We Follow //
  const posts = allPosts.filter((post) =>
    info.following.some((uid) => uid === post.uid)
  );

  return (
    <>
      {posts
        ? posts.map((post) => {
            return <Post key={post.id} post={post} />;
          })
        : "Loading..."}
    </>
  );
}

import React from "react";
import AddPost from "./AddPost";
import AllPosts from "./AllPosts";

export default function Posts() {
  return (
    <div className="bg-dark w-100 container p-3">
      <>
        <AddPost />
        <AllPosts />
      </>
    </div>
  );
}

import React from "react";
import Posts from "../components/Posts";
import AllUsers from "../components/AllUsers";

export default function Home() {
  return (
    <>
      <main
        className="container w-100 d-lg-flex gap-5
      mt-3 justify-content-around"
      >
        <Posts />
        <AllUsers />
      </main>
    </>
  );
}

import { serverTimestamp } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { addPostImg, addPostToData } from "../utils/helper";
import useUserData from "../hooks/useUserData";
import ProfileImg from "./ProfileImg";

export default function AddPost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { currentUser } = useAuth();

  const { info } = useUserData(currentUser.uid);

  const postRef = useRef();
  const postImgRef = useRef();

  async function handlePost(e) {
    e.preventDefault();

    const id = Math.floor(Math.random() * 9999999).toString();
    const text = postRef.current.value;
    const img = postImgRef.current.files[0];
    let imgURL = null;

    if (text === "") return alert("Write Something!");

    try {
      setLoading(true);
      if (img) await addPostImg(img).then((url) => (imgURL = url));

      const post = {
        id,
        text,
        imgURL,
        likes: [],
        comments: [],
        uid: info.uid,
        postedAt: serverTimestamp(),
      };

      await addPostToData(post, id, setLoading);
      setLoading(false);
    } catch {
      setError(true);
      setLoading(false);
    }

    e.target.reset();
  }
  return (
    <div>
      {error && alert("error while posting")}
      <h3>Posts</h3>
      <div
        className="container p-2 text-light"
        style={{ backgroundColor: "#333" }}
      >
        <div className="d-flex align-items-center gap-3 p-2 ">
          <ProfileImg post={info} />
          <span>{info.name}</span>
        </div>
        <form onSubmit={handlePost} className="p-2">
          <textarea
            placeholder="Say something..."
            rows="4"
            className="form-control text-light bg-dark"
            style={{ resize: "none" }}
            ref={postRef}
          ></textarea>
          <input
            type="file"
            className="input-file"
            accept="image/*"
            id="icon-button-file"
            ref={postImgRef}
          />
          <label htmlFor="icon-button-file" className="mt-2">
            <span className="bi bi-camera-fill text-light fs-3"></span>
          </label>
          <br />
          <button
            disabled={loading}
            type="submit"
            className="btn btn-outline-light w-100 mt-3"
          >
            {loading ? "Loading..." : "Post"}
          </button>
        </form>
      </div>
    </div>
  );
}

import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileImg from "../components/ProfileImg";
import { useAuth } from "../context/AuthContext";
import { updateUserProfile, updateUserProfileImg } from "../utils/helper";
import useUserData from "../hooks/useUserData";

export default function Edit() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { currentUser } = useAuth();
  const { info } = useUserData(currentUser.uid);
  const nameRef = useRef();
  const bioRef = useRef();
  const imgRef = useRef();
  const navigate = useNavigate();

  async function handleEdit(e) {
    e.preventDefault();
    setLoading(true);
    const name = nameRef.current.value;
    const bio = bioRef.current.value;
    const imgFile = imgRef.current.files[0];
    let imgURL = info.photoURL;
    if (name === "") return alert("Name cannot be empty");

    try {
      setLoading(true);
      if (imgFile) {
        await updateUserProfileImg(info, imgFile).then((url) => (imgURL = url));
      }

      const payload = { name, bio, photoURL: imgURL };
      await updateUserProfile(payload, info);
      setLoading(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  }

  return (
    <>
      {error && alert(error)}
      <main className="profile-page">
        <div className="text-center d-flex flex-column border p-5 w-50 align-items-center">
          <h3>Edit Profile</h3>
          <ProfileImg post={info} />
          <form onSubmit={handleEdit}>
            <label htmlFor="icon-upload" className="my-3">
              <span className="fs-4 bg-light text-dark rounded p-2">
                Upload &nbsp;
                <i className="bi bi-image-fill"></i>
              </span>
            </label>
            <br />
            <input
              type="file"
              className="input-file"
              accept="image/*"
              id="icon-upload"
              ref={imgRef}
            />
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              className="form-control bg-dark w-100 text-light"
              id="name"
              placeholder={info.name}
              ref={nameRef}
            />
            <label htmlFor="about" className="form-label mt-3">
              Bio
            </label>
            <input
              className="form-control bg-dark text-light"
              id="about"
              placeholder={info.bio}
              ref={bioRef}
            />
            <button disabled={loading} className="btn btn-success mt-3 w-100">
              {loading ? "loading..." : "Save"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

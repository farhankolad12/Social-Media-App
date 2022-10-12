import {
  getDoc,
  doc,
  setDoc,
  arrayRemove,
  arrayUnion,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db, firestore, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { deleteUser } from "firebase/auth";

export async function fetchCurrentUser(setLoading, setError, currentUser) {
  const userRef = doc(db, "users", currentUser.uid);
  const docSnap = await getDoc(userRef);

  try {
    if (docSnap.exists()) {
      setLoading(false);
      return docSnap.data();
    }
  } catch {
    setError(true);
  }
}

export async function addPostImg(img) {
  let imgURL = null;
  const imageRef = ref(storage, `images/${img.lastModified + img.name}`);
  await uploadBytes(imageRef, img);

  await getDownloadURL(imageRef).then((url) => {
    imgURL = url;
  });

  return imgURL;
}

export async function addPostToData(post, id, setLoading) {
  const postDocRef = doc(db, "posts", id);
  return setDoc(postDocRef, post).then(() => {
    setLoading(false);
  });
}

export async function removeFollow(user, userInfo) {
  const userFollowRef = doc(db, "users", user.uid);
  const userFollowingRef = doc(db, "users", userInfo.uid);
  await updateDoc(userFollowingRef, {
    following: arrayRemove(user.uid),
  });

  return updateDoc(userFollowRef, {
    followers: arrayRemove(userInfo.uid),
  });
}

export async function addFollow(user, userInfo) {
  const userFollowRef = doc(db, "users", user.uid);
  const userFollowingRef = doc(db, "users", userInfo.uid);
  await updateDoc(userFollowingRef, {
    following: arrayUnion(user.uid),
  });
  await updateDoc(userFollowRef, {
    followers: arrayUnion(userInfo.uid),
  });
}

export async function removeLikes(postId, userInfo) {
  const postDoc = doc(db, "posts", postId);
  return updateDoc(postDoc, {
    likes: arrayRemove(userInfo.uid),
  });
}

export async function addLikes(postId, userInfo) {
  const postDoc = doc(db, "posts", postId);
  return updateDoc(postDoc, {
    likes: arrayUnion(userInfo.uid),
  });
}

export async function addCommentsToPost(comment, postId) {
  const postRef = doc(db, "posts", `${postId}`);

  return updateDoc(postRef, {
    comments: arrayUnion(comment),
  });
}

export async function updateUserProfileImg(userInfo, imgFile) {
  let imgURL = null;
  const imageRef = ref(storage, `profileImg/${userInfo.uid}.jpg`);

  await uploadBytes(imageRef, imgFile);

  await getDownloadURL(imageRef).then((url) => (imgURL = url));

  return imgURL;
}

export async function updateUserProfile(payload, userInfo) {
  const docRef = doc(db, "users", userInfo.uid);

  return updateDoc(docRef, payload);
}

export async function deleteUserAndPosts(userInfo, currentUser) {
  const { postsRef } = firestore;

  const delUser = doc(db, "users", userInfo.uid);
  const q = query(postsRef, where("uid", "==", userInfo.uid));
  const postDocs = await getDocs(q);
  postDocs.forEach((post) => {
    const delPostDoc = doc(db, "posts", post.id);
    // Deleting Users Posts //
    deleteDoc(delPostDoc).catch((err) => alert(err));
  });
  // Deleting User From Firestore //
  await deleteDoc(delUser);

  // Deleting User From Authentication //
  return deleteUser(currentUser)
    .then(() => alert("Deleted"))
    .catch((err) => alert(err.message));
}

export async function addUserToData(snapshot, payload) {
  const userDoc = doc(db, "users", snapshot.user.uid);
  return setDoc(userDoc, payload);
}

import { orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../firebase";

export default function useUserPost(uid) {
  const [post, setPost] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  const { postsRef } = firestore;

  const q = query(postsRef, where("uid", "==", uid));
  const [posts] = useCollectionData(q);

  const q1 = query(postsRef, orderBy("postedAt", "desc"));
  const [all] = useCollectionData(q1);

  useEffect(() => {
    posts && setPost(posts);
    all && setAllPosts(all);
  }, [posts, all]);

  return post && { post, allPosts };
}

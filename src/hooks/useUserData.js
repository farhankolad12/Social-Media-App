import { orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../firebase";

export default function useUserData(uid) {
  const [info, setInfo] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const { userRef } = firestore;

  // Getting a single user //
  const q = query(userRef, where("uid", "==", uid));
  const [user] = useCollectionData(q);

  // Getting all users //
  const q1 = query(userRef, orderBy("createdAt", "desc"));
  const [users] = useCollectionData(q1);

  useEffect(() => {
    user && setInfo(user[0]);
    users && setAllUsers(users);
  }, [user, users]);

  return { info, allUsers };
}

import React, { useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";

const AuthProvider = React.createContext();

export function useAuth() {
  return useContext(AuthProvider);
}

export default function AuthContext({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  function login(email, pass) {
    return signInWithEmailAndPassword(auth, email, pass);
  }

  function signup(email, pass) {
    return createUserWithEmailAndPassword(auth, email, pass);
  }

  function signInWithGoogle() {
    return signInWithPopup(auth, googleProvider);
  }

  function logout() {
    return signOut(auth);
  }

  const value = {
    currentUser,
    setCurrentUser,
    login,
    signup,
    signInWithGoogle,
    logout,
  };

  return (
    <AuthProvider.Provider value={value}>
      {!loading && children}
    </AuthProvider.Provider>
  );
}

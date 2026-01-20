import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import { AuthContext } from "./AuthContext";
import useAxiosPublic from "../hooks/useAxiosPublic";

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      // Set persistence to LOCAL for mobile compatibility
      await setPersistence(auth, browserLocalPersistence);
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logOut = async () => {
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  // onAuthStateChange
  useEffect(() => {
    // Set persistence on app load for mobile compatibility
    setPersistence(auth, browserLocalPersistence).catch((error) => {
      console.error("Persistence Error:", error);
    });

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // 1. Get Token from Backend FIRST
        const userInfo = { email: currentUser.email };
        try {
          await axiosPublic.post("/jwt", userInfo);
          // 2. ONLY set user AFTER token is successfully set in cookies
          setUser(currentUser);
        } catch (err) {
          console.error("Token Error:", err);
          setUser(null);
        }
      } else {
        // User is Logged Out
        setUser(null);

        // Clear Token from Backend
        try {
          await axiosPublic.post("/logout");
        } catch (err) {
          console.error("Logout Error:", err);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [axiosPublic]);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    logOut,
    updateUserProfile,
    resetPassword,
    googleSignIn,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

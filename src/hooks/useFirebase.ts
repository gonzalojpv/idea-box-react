import { initializeApp, FirebaseApp } from "firebase/app";
import {
  getAuth,
  Auth,
  AuthError,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { collection, getDocs, getFirestore, addDoc, orderBy, query } from "firebase/firestore";
import type { Idea } from "../types/ideas";

import "firebase/auth";
import "firebase/firestore";

export default function useFirebase() {
  const app: FirebaseApp = initializeApp({
    apiKey: "AIzaSyB-ZcwRQPg-Gr4zD1MiYCBiSUuUPrHjZKI",
    authDomain: "ideaboxlive-ef86d.firebaseapp.com",
    projectId: "ideaboxlive-ef86d",
    storageBucket: "ideaboxlive-ef86d.appspot.com",
    messagingSenderId: "468130084061",
    appId: "1:468130084061:web:54dc546f50292f64af1734",
  });

  const auth: Auth = getAuth(app);
  const db = getFirestore(app);

  const doLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    try {
      const result = await signInWithPopup(auth, provider);
      GoogleAuthProvider.credentialFromResult(result);
    } catch (error) {
      GoogleAuthProvider.credentialFromError(error as AuthError);
    }
  };

  const doLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
    } catch (error) {
      // An error happened.
      console.error(error);
    }
  };

  const fetchCollection = async (path: string) => {
    const collectionRef = collection(db, path);
    const orderedAndLimitedQuery = query(collectionRef, orderBy("votes", "desc"));
    const querySnapshot = await getDocs(orderedAndLimitedQuery);
    const newIdeas: Idea[] = [];
    querySnapshot.forEach(doc => {
      const { name, user, userName, votes, createdAt } = doc.data();
      const id = doc.id;
      newIdeas.push({
        name,
        user,
        userName,
        createdAt,
        votes,
        id,
      });
    });

    return newIdeas;
  };

  const addToCollection = async (newItem: Idea) => {
    try {
      await addDoc(collection(db, "ideas"), newItem);
    } catch (error) {
      console.error(error);
    }
  };

  return [auth, db, doLoginWithGoogle, doLogout, fetchCollection, addToCollection];
}

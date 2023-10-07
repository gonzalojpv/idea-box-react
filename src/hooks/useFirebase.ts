import { initializeApp, FirebaseApp } from "firebase/app";
import {
  getAuth,
  Auth,
  AuthError,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  collection,
  getDocs,
  getFirestore,
  addDoc,
  orderBy,
  query,
  doc,
  getDoc,
  updateDoc,
  increment,
  setDoc,
  arrayUnion,
  Firestore
} from "firebase/firestore";
import type { Idea } from "../types/ideas";

export default function useFirebase() {
  // @ts-ignore
  let auth: Auth
  let  db: Firestore
  let app: FirebaseApp

  const init = (): void => {
    app = initializeApp({
      apiKey: "AIzaSyB-ZcwRQPg-Gr4zD1MiYCBiSUuUPrHjZKI",
      authDomain: "ideaboxlive-ef86d.firebaseapp.com",
      projectId: "ideaboxlive-ef86d",
      storageBucket: "ideaboxlive-ef86d.appspot.com",
      messagingSenderId: "468130084061",
      appId: "1:468130084061:web:54dc546f50292f64af1734",
    });

    auth = getAuth(app);
    db = getFirestore(app);
  }

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

  const fetchCollection = async (path: string): Promise<Idea[]> => {
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

    return Promise.resolve(newIdeas);
  };

  const addToCollection = async (newItem: Idea) => {
    try {
      await addDoc(collection(db, "ideas"), newItem);
    } catch (error) {
      console.error(error);
    }
  };
  // @ts-ignore
  const voteIdea = async ({ id, type, userId }): void => {
    const docRef = doc(db, "ideas", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const votes = docSnap.data().ideas;
      // @ts-ignore
      if (votes.find(vote => vote === id)) throw new Error("User already voted!");
    }

    const ideaRef = doc(db, "ideas", id);

    await updateDoc(ideaRef, {
      votes: increment(type ? 1 : -1),
    });

    // Add a new document in collection "cities"
    await setDoc(
      doc(db, "ideas", userId),
      {
        ideas: arrayUnion(id),
      },
      { merge: true },
    );
  };

  return [ init, doLoginWithGoogle, doLogout, fetchCollection, addToCollection, voteIdea];
}

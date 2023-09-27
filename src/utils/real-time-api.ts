import { initializeApp, FirebaseError } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, signInWithCustomToken } from "firebase/auth";


import {  getDatabase, ref, child, get, onValue, off } from "firebase/database";
import { collection, getDocs, getFirestore } from "firebase/firestore";

// This value is the default 403 code from firebase
const PERMISSION_DENIED_STATUS_CODE = "PERMISSION_DENIED";

export interface RealTimeFetchParams {
  path: string;
}

export interface RealTimeSubscribeParams<T> {
  path: string;
  event?: firebase.database.EventType;
  callback: (value: T) => void;
}

export interface RealTimeUnsubscribeParams {
  path: string;
  event?: firebase.database.EventType;
}

export class RealTimeApi {
  private firebase;
  private auth;

  constructor() {
    this.handleAuthenticationErrors = this.handleAuthenticationErrors.bind(this);

    this.firebase = initializeApp({
      apiKey: "AIzaSyB-ZcwRQPg-Gr4zD1MiYCBiSUuUPrHjZKI",
      authDomain: "ideaboxlive-ef86d.firebaseapp.com",
      projectId: "ideaboxlive-ef86d",
      storageBucket: "ideaboxlive-ef86d.appspot.com",
      messagingSenderId: "468130084061",
      appId: "1:468130084061:web:54dc546f50292f64af1734",
    });
    this.auth = getAuth(this.firebase);
    this.doLoginWithGoogle = this.doLoginWithGoogle.bind(this);
    this.fetch = this.fetch.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
  }

  private handleAuthenticationErrors(error: FirebaseError) {
    if (error.code === PERMISSION_DENIED_STATUS_CODE) {
      // handle logout any way you want. For example, if you were using
      // AWS Cognito, you'd call `Auth.logout()`
    }
  }

  public connect(token: string) {
    return signInWithCustomToken(token);
  }

  public disconnect() {
    const auth = getAuth();
    return signOut(auth);
  }

  public fetch<T>({ path }: RealTimeFetchParams) {
    

    return new Promise<T>(resolve => {
      const dbRef = ref(getDatabase());
      get(child(dbRef, path)).then((snapshot) => {
        if (snapshot.exists()) {
          resolve(snapshot.val());
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    });
  }

  public async subscribe<T>({ path, callback, event = "value" }: RealTimeSubscribeParams<T>) {
    const db = getFirestore(this.firebase);

    const querySnapshot = await getDocs(collection(db, "ideas"));
    console.log('querySnapshot', querySnapshot)
    // const starCountRef = ref(db, path);

    // const cb = (snapshot) => {
    //   const data = snapshot.val();
    //   console.log('data', data)
    //   callback(data as T);
    // };

    // onValue(starCountRef, cb);

    // return () => off(event, cb);
    return () => { console.log('---a') };
  }

  public unsubscribe({ path, event = "value" }: RealTimeUnsubscribeParams) {
    // const database = getDatabase();
    // database.ref(path).off(event);
  }

  public async doLoginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    try {
      const result = await signInWithPopup(auth, provider);
      GoogleAuthProvider.credentialFromResult(result);
    } catch (error) {
      GoogleAuthProvider.credentialFromError(error);
    }
  }

  public async doLogout() {
    try {
      const auth = getAuth();
      await signOut(auth);
    } catch (error) {
      // An error happened.
      console.error(error);
    }
  }
}

export default new RealTimeApi();

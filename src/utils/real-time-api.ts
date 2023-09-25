import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

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
  private firebase: firebase.app?.App;

  constructor() {
    this.handleAuthenticationErrors = this.handleAuthenticationErrors.bind(this);

    this.firebase = firebase.initializeApp({
      apiKey: "AIzaSyB-ZcwRQPg-Gr4zD1MiYCBiSUuUPrHjZKI",
      authDomain: "ideaboxlive-ef86d.firebaseapp.com",
      projectId: "ideaboxlive-ef86d",
      storageBucket: "ideaboxlive-ef86d.appspot.com",
      messagingSenderId: "468130084061",
      appId: "1:468130084061:web:54dc546f50292f64af1734",
    });
  }

  private handleAuthenticationErrors(error: firebase.FirebaseError) {
    if (error.code === PERMISSION_DENIED_STATUS_CODE) {
      // handle logout any way you want. For example, if you were using
      // AWS Cognito, you'd call `Auth.logout()`
    }
  }

  public connect(token: string) {
    return this.firebase.auth().signInWithCustomToken(token);
  }

  public disconnect() {
    return this.firebase.auth().signOut();
  }

  public fetch<T>({ path }: RealTimeFetchParams) {
    return new Promise<T>(resolve => {
      this.firebase
        .database()
        .ref(path)
        .once(
          "value",
          snapshot => {
            resolve(snapshot.val());
          },
          this.handleAuthenticationErrors,
        );
    });
  }

  public subscribe<T>({ path, callback, event = "value" }: RealTimeSubscribeParams<T>) {
    const ref = this.firebase.database().ref(path);
    const cb = (snapshot: firebase.database.DataSnapshot) => {
      callback(snapshot.val() as T);
    };

    ref.on(event, cb, this.handleAuthenticationErrors);
    return () => ref.off(event, cb);
  }

  public unsubscribe({ path, event = "value" }: RealTimeUnsubscribeParams) {
    this.firebase.database().ref(path).off(event);
  }

  public doLoginWithGoogle () {
    const provider = new this.firebase.auth().GoogleAuthProvider();
      try {
        await this.firebase.auth().signInWithPopup(provider);
      } catch (error) {
        console.error(error);
      }
  }
}

export default new RealTimeApi();

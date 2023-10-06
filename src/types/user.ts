import { Auth, User } from "firebase/auth";

export type FirebaseUser = (User & Auth) | null;

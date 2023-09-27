import { Auth } from "firebase/auth";

type User = {
  displayName?: string
  uid?: string
}

export type FirebaseUser = User & Auth | null
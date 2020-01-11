// @flow
import * as React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase-config";

const firebaseApp = firebase.initializeApp(firebaseConfig);

export function Auth(props) {
  const [user, initialising, error] = useAuthState(firebase.auth());
  const login = () => {
    firebase.auth().signInWithEmailAndPassword("test@harbor.school", "123456");
  };
  const logout = () => {
    firebase.auth().signOut();
  };

  if (initialising) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (user) {
    return (
      <div>
        <p>Current User: {user.email}</p>
        <button onClick={logout}>Log out</button>
      </div>
    );
  }
  return <button onClick={login}>Log in</button>;
}

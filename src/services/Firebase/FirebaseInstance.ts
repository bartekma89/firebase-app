import firebase from "firebase";
import app from "firebase/app";
import "firebase/auth";

import { config } from "./config";

class Firebase {
  auth: firebase.auth.Auth;

  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
  }
}

export default Firebase;

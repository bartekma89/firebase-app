import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import { config } from "./config";

firebase.initializeApp(config);

export default firebase;

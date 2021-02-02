import app from "firebase/app";
import "firebase/auth";

import { config } from "./config";

class Firebase {
  constructor() {
    app.initializeApp(config);
  }
}

export default Firebase;

import ReactDOM from "react-dom";
import React from "react";

import { App } from "./App";
import { FirebaseInstance } from "./services/Firebase";
import { FirebaseContext } from "./services/context";

import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <FirebaseContext.Provider value={new FirebaseInstance()}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </FirebaseContext.Provider>,
  document.getElementById("root")
);

reportWebVitals();

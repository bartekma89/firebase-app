import ReactDOM from "react-dom";
import React from "react";

import { App } from "./screens/App";
import { FirebaseContext, FirebaseInstance } from "./services/Firebase";

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

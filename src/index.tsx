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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

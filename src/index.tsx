import ReactDOM from "react-dom";
import React from "react";

import { App } from "./App";
import { ProvideAuthorization } from "./components/ProvideAuthorization";

import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <ProvideAuthorization>
      <App />
    </ProvideAuthorization>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();

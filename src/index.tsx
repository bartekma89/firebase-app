import ReactDOM from "react-dom";
import React from "react";

import { App } from "./App";
import { ProvideAuth } from "./components/ProvideAuth";

import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <ProvideAuth>
      <App />
    </ProvideAuth>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();

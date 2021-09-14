import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import { ThemeProvider } from "@ui5/webcomponents-react";

ReactDOM.render(
   <React.StrictMode>
      <ThemeProvider>
         <App />
      </ThemeProvider>
   </React.StrictMode>,
   document.getElementById("root")
);

// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

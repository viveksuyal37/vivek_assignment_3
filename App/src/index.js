import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import LoaderState from "./Components/Context/LoaderState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LoaderState>
    <App />
  </LoaderState>
);

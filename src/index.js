import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router basename="/Project-_Flashcards-_Qualified_-Node_18--Federico_Buzeta_Borquez-Solution">
      <App />
    </Router>
  </React.StrictMode>
);

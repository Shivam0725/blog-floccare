import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // keep this

// ❌ REMOVE or comment out these lines
// import './index.css';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ❌ REMOVE or comment out this line
// reportWebVitals();

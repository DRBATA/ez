// src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    // 1. Unregister all existing service workers to avoid conflicts
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        registration.unregister();
      });

      // 2. Register the new service worker
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(() => console.log("✅ Service Worker Registered"))
        .catch((error) => console.error("❌ Service Worker Error:", error));
    });
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Invoke SW registration after mounting the app
registerServiceWorker();

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App";
import "@/styles/globals.css";
import { initAnalytics } from "@/utils/analytics";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Initialize analytics after first paint (non-blocking)
if (window.requestIdleCallback) {
  window.requestIdleCallback(initAnalytics);
} else {
  window.setTimeout(initAnalytics, 1000);
}

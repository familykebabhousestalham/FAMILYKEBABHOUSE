import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom"; // Use HashRouter for hash-based routing
import App from "./App";
import "./index.css";
import { register as registerSW, setupPWAInstallPrompt } from "./utils/sw-registration";

// Register service worker for PWA functionality
registerSW({
  onSuccess: (registration) => {
    console.log('Service worker registered successfully');
  },
  onUpdate: (registration) => {
    console.log('New content available, please refresh');
    // You can show a notification to user here
    if (confirm('New version available! Click OK to refresh.')) {
      window.location.reload();
    }
  },
});

// Setup PWA install prompt
setupPWAInstallPrompt();

createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <App />
  </HashRouter>
);

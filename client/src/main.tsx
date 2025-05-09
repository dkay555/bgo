import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Ensure the app is visible to screen readers
document.documentElement.lang = "de";
document.documentElement.style.scrollBehavior = "smooth";

createRoot(document.getElementById("root")!).render(<App />);

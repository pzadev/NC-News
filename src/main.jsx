import { createRoot } from "react-dom/client";
import "./main.css";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import UserProvider from "./Components/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <UserProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserProvider>
);

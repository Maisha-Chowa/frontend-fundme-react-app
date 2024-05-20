import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Router, RouterProvider } from "react-router-dom";
import routes from "./routes/routes.jsx";
import { WalletProvider } from "./context/WalletContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WalletProvider>
      <RouterProvider router={routes}>
        <App />
      </RouterProvider>
    </WalletProvider>
  </React.StrictMode>
);

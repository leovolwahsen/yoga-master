import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routers/router";
import AuthenticationProvider from "./utilities/providers/AuthenticationProvider";


const root = document.getElementById("root");
root && ReactDOM.createRoot(root).render(
  <AuthenticationProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </AuthenticationProvider>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { PrimaryLayout } from "./layout/PrimaryLayout";
import { Instructors } from "./pages/Instructors";
import { Classes } from "./pages/Classes";
import { HomeConainer } from "./pages/home/HomeConainer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrimaryLayout />,
    children: [
      {
        path: "/",
        element: <HomeConainer />
      },
      {
        path: "/instructors",
        element: <Instructors />
      },
      {
        path: "/classes",
        element: <Classes />
      }
    ]
  },
]);

const root = document.getElementById("root");
root && ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

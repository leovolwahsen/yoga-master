import { createBrowserRouter } from "react-router-dom";
import { PrimaryLayout } from "../layout/PrimaryLayout";
import { Classes } from "../pages/Classes";
import { Home } from "../pages/home/Home";
import { Instructors } from "../pages/Instructors";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrimaryLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/instructors",
        element: <Instructors />,
      },
      {
        path: "/classes",
        element: <Classes />,
      }
    ],
  },
]);

export default router;

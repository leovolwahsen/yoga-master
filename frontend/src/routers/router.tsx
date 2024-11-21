import { createBrowserRouter } from "react-router-dom";
import { PrimaryLayout } from "../layout/PrimaryLayout";
import { Home } from "../pages/home/Home";
import { Instructors } from "../pages/Instructors";
import { Classes } from "../pages/classes/Classes";
import { Class } from "../pages/classes/Class";
import axios from "axios";

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
      },
      {
        path: "/class/:id",
        element: <Class />,
        loader: ({params}) => axios(`http://localhost:5000/class/${params.id}`)
      }
    ],
  }, 
]);

export default router;

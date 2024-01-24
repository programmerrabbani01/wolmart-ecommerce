import { createBrowserRouter } from "react-router-dom";
import publicRouter from "./publicRouter.jsx";
import privateRouter from "./privateRouter.jsx";
import Layouts from "../layouts/Layouts.jsx";

// create browser router

const router = createBrowserRouter([
  {
    element: <Layouts />,
    children: [...publicRouter, ...privateRouter],
  },
]);

// export router

export default router;

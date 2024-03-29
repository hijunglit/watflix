import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
  } from "react-router-dom";
import Coin from "./routes/Coin";
import App from "./App";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/:coinId",
      element: <Coin />,
    }
  ])

export default router;
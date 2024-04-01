import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    Link,
  } from "react-router-dom";
import Coin from "./routes/Coin";
import App from "./App";
import Price from "./routes/Price";
import Chart from "./routes/Chart";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/:coinId",
      element: <Coin />,
      children: [
        {
          path: "price",
          element: <Price />
        },
        {
          path: "chart",
          element: <Chart />
        }
      ]
    }
  ])
export default router;
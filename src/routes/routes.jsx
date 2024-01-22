import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Connect from "../components/Connect";
import AccountLayout from "../components/AccountLayout";
import Home from "../components/Home";
import AllAccount from "../components/AllAccount";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/account",
        element: <AccountLayout />,
      },
      {
        path: "/all-account",
        element: <AllAccount />,
      },
    ],
  },
]);
export default routes;

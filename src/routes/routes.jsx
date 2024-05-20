import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Connect from "../components/Connect";
import AccountLayout from "../components/AccountLayout";
import Home from "../components/Home";
import AllAccount from "../components/AllAccount";
import WalletHome from "../components/wallet/WalletHome";
import WalletView from "../components/wallet/WalletView";
import CreateAccount from "../components/wallet/CreateAccount";
import RecoverAccount from "../components/wallet/RecoverAccount";

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
        path: "/home",
        element: <WalletHome />,
      },
      {
        path: "/account",
        element: <AccountLayout />,
      },
      {
        path: "/all-account",
        element: <AllAccount />,
      },
      {
        path: "/your-wallet",
        element: <WalletView />,
      },
      {
        path: "/create-account",
        element: <CreateAccount />,
      },
      {
        path: "/recover",
        element: <RecoverAccount />,
      },
    ],
  },
]);
export default routes;

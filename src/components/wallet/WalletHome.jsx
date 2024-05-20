import React from "react";
import mwallet from "../../../src/assets/mwallet.png";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function WalletHome() {
  const navigate = useNavigate();

  return (
    <>
      <div className="content">
        {/* <img src={mwallet} alt="logo" className="frontPageLogo" /> */}
        <h2 className="text-2xl font-bold text-fuchsia-400 p-4">
          {" "}
          Hey There 👋{" "}
        </h2>
        <h4 className="text-xl text-fuchsia-400 pb-4">
          {" "}
          Welcome to your Web3 Wallet
        </h4>
        <Button
          onClick={() => navigate("/your-wallet")}
          className="frontPageButton w-25 bg-fuchsia-500 text-white mr-4"
          //   type="primary"
        >
          Create A Wallet
        </Button>
        <Button
          onClick={() => navigate("/recover")}
          className="frontPageButton w-25 bg-fuchsia-500 text-white mr-4"
          type="default"
        >
          Sign In With Seed Phrase
        </Button>
        <p className="frontPageBottom">
          Find Alt Coin Gems:{" "}
          <a href="https://moralismoney.com/" target="_blank" rel="noreferrer">
            money.moralis.io
          </a>
        </p>
      </div>
    </>
  );
}

export default WalletHome;

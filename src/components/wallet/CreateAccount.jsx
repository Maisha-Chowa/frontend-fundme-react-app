import React from "react";
import { Button, Card } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ethers } from "ethers";
import { useWallet } from "../../context/WalletContext";
// { setWallet, setSeedPhrase, wallet, seedPhrase }
function CreateAccount() {
  const [newSeedPhrase, setNewSeedPhrase] = useState(null);
  const navigate = useNavigate();
  const { wallet, setWallet, seedPhrase, setSeedPhrase } = useWallet();

  function generateWallet() {
    const mnemonic = ethers.Wallet.createRandom().mnemonic.phrase;
    setNewSeedPhrase(mnemonic);
  }

  function setWalletAndMnemonic() {
    console.log("click");
    console.log(newSeedPhrase);
    setSeedPhrase(newSeedPhrase);
    setWallet(ethers.Wallet.fromPhrase(newSeedPhrase).address);
    console.log(wallet, seedPhrase);
    if (wallet && seedPhrase) {
      navigate("/your-wallet");
    }
  }

  return (
    <>
      <div className="content">
        <div className="mnemonic flex flex-row">
          <ExclamationCircleOutlined
            style={{ fontSize: "20px", color: "red" }}
          />
          <div
            className="text-fuchsia-400"
            style={{
              border: "1px solid red",
              padding: "30px",
              borderRadius: "15px",
              margin: "5px",
              color: "red",
            }}
          >
            Once you generate the seed phrase, save it securely in order to
            recover your wallet in the future.
          </div>
        </div>
        <Button
          className="frontPageButton my-4  text-white bg-fuchsia-800 center"
          onClick={() => generateWallet()}
        >
          Generate Seed Phrase
        </Button>
        <Card className="seedPhraseContainer bg-base-200 my-4 py-8 text-white">
          {newSeedPhrase && (
            <pre style={{ whiteSpace: "pre-wrap" }}>{newSeedPhrase}</pre>
          )}
        </Card>
        <Button
          className="frontPageButton my-4  text-white bg-fuchsia-800 "
          onClick={() => setWalletAndMnemonic()}
        >
          Open Your New Wallet
        </Button>
        <p
          className="frontPageBottom"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          Back Home
        </p>
      </div>
    </>
  );
}

export default CreateAccount;

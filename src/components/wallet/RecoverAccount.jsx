import React from "react";
import { BulbOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ethers } from "ethers";
import { useWallet } from "../../context/WalletContext";

const { TextArea } = Input;

function RecoverAccount() {
  const { setWallet, setSeedPhrase } = useWallet();
  const navigate = useNavigate();
  const [typedSeed, setTypedSeed] = useState("");
  const [nonValid, setNonValid] = useState(false);

  function seedAdjust(e) {
    setNonValid(false);
    setTypedSeed(e.target.value);
  }

  function recoverWallet() {
    let recoveredWallet;
    try {
      recoveredWallet = ethers.Wallet.fromPhrase(typedSeed);
    } catch (err) {
      setNonValid(true);
      return;
    }

    setSeedPhrase(typedSeed);
    setWallet(recoveredWallet.address);
    navigate("/your-wallet");
    return;
  }

  return (
    <>
      <div className="content mx-4">
        <div className="mnemonic flex flex-row my-8">
          <BulbOutlined style={{ fontSize: "20px", color: "orange" }} />
          <div
            className="text-fuchsia-400"
            style={{
              border: "1px solid orange",
              padding: "30px",
              borderRadius: "15px",
              margin: "5px",
              color: "orange",
            }}
          >
            Type your seed phrase in the field below to recover your wallet (it
            should include 12 words seperated with spaces)
          </div>
        </div>
        <TextArea
          value={typedSeed}
          onChange={seedAdjust}
          rows={4}
          className="seedPhraseContainer my-4 py-8 text-black"
          placeholder="Type your seed phrase here..."
        />
        <Button
          disabled={
            typedSeed.split(" ").length !== 12 || typedSeed.slice(-1) === " "
          }
          className="frontPageButton my-4 text-white bg-fuchsia-800"
          type="primary"
          onClick={() => recoverWallet()}
        >
          Recover Wallet
        </Button>
        {nonValid && <p style={{ color: "red" }}> Invalid Seed Phrase</p>}
        <p
          className="frontPageBottom"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <span>Back Home</span>
        </p>
      </div>
    </>
  );
}

export default RecoverAccount;

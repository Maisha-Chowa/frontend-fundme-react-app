import React, { useState } from "react";

const Connect = () => {
  const [state, getState] = useState("Connect your Metamask Wallet");
  const connectMetamask = async () => {
    if (typeof window.ethereum !== "undefined") {
      console.log("I see a metamask");
      await window.ethereum.request({ method: "eth_requestAccounts" });
      getState("Connected");
      window.alert(" Yeh!!!  connected to the metamask!!!!!!");
    } else {
      getState("Please Install Metamask");
      console.log("Don't see metamask");
    }
  };
  return (
    <div>
      <button
        className="btn rouded-full bg-fuchsia-600 text-white text-2xl"
        onClick={connectMetamask}
      >
        {state}
      </button>
    </div>
  );
};

export default Connect;

import React, { useEffect, useState } from "react";
import { Contract, ethers } from "../ether-connections/ethers-5.6.esm.min.js";
import { abi, contractAddress } from "../ether-connections/constants.js";
import { listenForTransactionMine } from "../ether-connections/listenForTransactionMine.js";
const AllAccount = () => {
  const [funders, setFunders] = useState([]);
  const getAllUser = async (event) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      console.log(contract);
      try {
        const funders = await contract.getFunders();
        console.log("funders", funders);
        setFunders(funders);
      } catch (error) {
        console.log(error);
      }
    } else {
      fundBtn.innerHTML = "Please install MetaMask";
    }
  };
  return (
    <div>
      {/* <h1> Acounts{funders}</h1> */}
      {funders.map((funder) => (
        <h2> Account: {funder}</h2>
      ))}
      <div>
        {/* <Connect /> */}
        <button
          className="bg-fuchsia-800 p-6 rounded-full text-white"
          onClick={getAllUser}
        >
          Show All Accounts
        </button>
      </div>
    </div>
  );
};

export default AllAccount;

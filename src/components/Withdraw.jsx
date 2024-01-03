import React, { useRef } from "react";
import { Contract, ethers } from "../ether-connections/ethers-5.6.esm.min.js";
import { abi, contractAddress } from "../ether-connections/constants.js";
import { listenForTransactionMine } from "../ether-connections/listenForTransactionMine.js";

const Withdraw = () => {
  const ethAmountRef = useRef();
  const handleWithdraw = async (event) => {
    event.preventDefault();
    const ethAmount = ethAmountRef.current?.value;
    console.log(`Withdrawing amount ${ethAmount}...`);
    console.log(`Withdrawing...`);
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      console.log("Contract Details ..", contract);
      console.log("Contract Details ..", contractAddress);
      console.log("Contract Details ..", abi);
      console.log("Contract Details ..", signer);
      try {
        const transactionResponse = await contract.withdraw({
          value: ethers.utils.parseEther(ethAmount),
        });
        await listenForTransactionMine(transactionResponse, provider);
      } catch (error) {
        console.log(error);
      }
    } else {
      withdrawButton.innerHTML = "Please install MetaMask";
    }

    event.target.reset();
  };
  return (
    <div className="">
      <form onSubmit={handleWithdraw}>
        <input
          id="eth-amount"
          placeholder="eth-amount"
          type="text"
          ref={ethAmountRef}
          className="w-96 p-5 rounded-full border-solid border-2 border-indigo-600"
        />
        <button
          type="submit"
          className=" btn rouded-full bg-fuchsia-600 text-white text-1xl mx-4"
        >
          Withdraw
        </button>
      </form>
    </div>
  );
};

export default Withdraw;

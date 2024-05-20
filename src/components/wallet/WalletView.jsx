import React, { Children, useEffect, useState } from "react";
import {
  Divider,
  Tooltip,
  List,
  Avatar,
  Spin,
  Tabs,
  Input,
  Button,
} from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/noImg.png";
import axios from "axios";
import { CHAINS_CONFIG } from "../../chains";
import { ethers } from "ethers";
import { useWallet } from "../../context/WalletContext";

function WalletView() {
  const navigate = useNavigate();
  const [tokens, setTokens] = useState(null);
  const [nfts, setNfts] = useState(null);
  const [balance, setBalance] = useState(0);
  const [fetching, setFetching] = useState(true);
  const [amountToSend, setAmountToSend] = useState(null);
  const [sendToAddress, setSendToAddress] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [hash, setHash] = useState(null);

  const {
    wallet,
    setWallet,
    seedPhrase,
    setSeedPhrase,
    selectedChain,
    setSelectedChain,
  } = useWallet();
  console.log(
    "wallet:" + wallet + "\n",
    "wallet:" + seedPhrase + "\n",
    "selectedChain:" + selectedChain + "\n"
  );

  const items = [
    {
      key: "3",
      label: `Tokens`,
      children: (
        <>
          {tokens ? (
            <>
              <List
                bordered
                itemLayout="horizontal"
                dataSource={tokens}
                renderItem={(item, index) => (
                  <List.Item
                    style={{ textAlign: "left", color: "white", font: "18px" }}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.logo || logo} />}
                      title={item.symbol}
                      description={item.name}
                    />
                    <div>
                      {(
                        Number(item.balance) /
                        10 ** Number(item.decimals)
                      ).toFixed(2)}{" "}
                      Tokens
                    </div>
                  </List.Item>
                )}
              />
            </>
          ) : (
            <>
              <span className="text-white text-lg">
                You seem to not have any tokens yet
              </span>
              <p className="frontPageBottom">
                Find Alt Coin Gems:{" "}
                <a
                  href="https://moralismoney.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-fuchsia-400"
                >
                  money.moralis.io
                </a>
              </p>
            </>
          )}
        </>
      ),
    },
    {
      key: "2",
      label: `NFTs`,
      children: (
        <>
          {nfts ? (
            <>
              {nfts.map((e, i) => {
                return (
                  <>
                    {e && (
                      <img
                        key={i}
                        className="nftImage"
                        alt="nftImage"
                        src={e}
                      />
                    )}
                  </>
                );
              })}
            </>
          ) : (
            <>
              <span className="text-white text-lg">
                You seem to not have any NFTs yet
              </span>
              <p className="frontPageBottom text-white">
                Find Alt Coin Gems:{" "}
                <a
                  href="https://moralismoney.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-fuchsia-400"
                >
                  money.moralis.io
                </a>
              </p>
            </>
          )}
        </>
      ),
    },
    // {
    //   key: "1",
    //   label: `Transfer`,
    //   children: (
    //     <>
    //       <h3>Native Balance </h3>
    //       <h1>
    //         {balance.toFixed(2)} {CHAINS_CONFIG[selectedChain].ticker}
    //       </h1>
    //       <div className="sendRow">
    //         <p style={{ width: "90px", textAlign: "left" }}> To:</p>
    //         <Input
    //           value={sendToAddress}
    //           onChange={(e) => setSendToAddress(e.target.value)}
    //           placeholder="0x..."
    //         />
    //       </div>
    //       <div className="sendRow">
    //         <p style={{ width: "90px", textAlign: "left" }}> Amount:</p>
    //         <Input
    //           value={amountToSend}
    //           onChange={(e) => setAmountToSend(e.target.value)}
    //           placeholder="Native tokens you wish to send..."
    //         />
    //       </div>
    //       <Button
    //         style={{ width: "100%", marginTop: "20px", marginBottom: "20px" }}
    //         type="primary"
    //         onClick={() => sendTransaction(sendToAddress, amountToSend)}
    //       >
    //         Send Tokens
    //       </Button>
    //       {processing && (
    //         <>
    //           <Spin />
    //           {hash && (
    //             <Tooltip title={hash}>
    //               <p>Hover For Tx Hash</p>
    //             </Tooltip>
    //           )}
    //         </>
    //       )}
    //     </>
    //   ),
    // },
  ];

  async function sendTransaction(to, amount) {
    const chain = CHAINS_CONFIG[selectedChain];

    const provider = new ethers.JsonRpcProvider(chain.rpcUrl);

    const privateKey = ethers.Wallet.fromPhrase(seedPhrase).privateKey;

    const wallet = new ethers.Wallet(privateKey, provider);

    const tx = {
      to: to,
      value: ethers.parseEther(amount.toString()),
    };

    setProcessing(true);
    try {
      const transaction = await wallet.sendTransaction(tx);

      setHash(transaction.hash);
      const receipt = await transaction.wait();

      setHash(null);
      setProcessing(false);
      setAmountToSend(null);
      setSendToAddress(null);

      if (receipt.status === 1) {
        getAccountTokens();
      } else {
        console.log("failed");
      }
    } catch (err) {
      setHash(null);
      setProcessing(false);
      setAmountToSend(null);
      setSendToAddress(null);
    }
  }

  async function getAccountTokens() {
    setFetching(true);

    const res = await axios.get(`http://localhost:3001/getTokens`, {
      params: {
        userAddress: wallet,
        chain: 0xaa36a7,
      },
    });

    const response = res.data;
    console.log(response);

    if (response.tokens.length > 0) {
      setTokens(response.tokens);
    }

    if (response.nfts.length > 0) {
      setNfts(response.nfts);
    }

    setBalance(response.balance);

    setFetching(false);
  }

  // const items = [
  //   {
  //     key: "3",
  //     label: `Tokens`,
  //     // children: {

  //     // },
  //   },
  //   {
  //     key: "2",
  //     label: `NFTs`,
  //     // children: {
  //     //   NFTs,
  //     // },
  //   },
  //   {
  //     key: "3",
  //     label: `Transfer`,
  //     // children: {
  //     //   Transfer,
  //     // },
  //   },
  // ];

  function logout() {
    setSeedPhrase(null);
    setWallet(null);
    // setNfts(null);
    // setTokens(null);
    // setBalance(0);
    navigate("/");
  }

  useEffect(() => {
    if (!wallet || !selectedChain) return;
    setNfts(null);
    setTokens(null);
    setBalance(0);
    getAccountTokens();
  }, []);

  useEffect(() => {
    if (!wallet) return;
    setNfts(null);
    setTokens(null);
    setBalance(0);
    getAccountTokens();
  }, [selectedChain]);

  return (
    <>
      <div className="content w-96 m-0">
        <div className="logoutButton text-xxl text-orange-800" onClick={logout}>
          <LogoutOutlined />
        </div>
        <div className="walletName text-center text-xl text-fuchsia-400 font-bold">
          Wallet
        </div>
        <Tooltip title={wallet}>
          <div className="text-center text-lg text-fuchsia-400">
            {wallet.slice(0, 4)}...{wallet.slice(38)}
          </div>
        </Tooltip>
        <Divider />
        <Tabs defaultActiveKey="1" items={items} className="walletView" />
        {/* {fetching ? (
          <Spin />
        ) : (
          <Tabs defaultActiveKey="1" items={items} className="walletView" />
        )} */}
      </div>
    </>
  );
}

export default WalletView;

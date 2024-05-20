import { Select } from "antd";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useWallet } from "../context/WalletContext";
function Home() {
  const navigate = useNavigate();
  const {
    wallet,
    setWallet,
    seedPhrase,
    setSeedPhrase,
    selectedChain,
    setSelectedChain,
  } = useWallet();
  return (
    <div className="App">
      <header>
        <img
          src="https://media.istockphoto.com/id/1084096262/vector/concept-of-mobile-payments-wallet-connected-with-mobile-phone.jpg?s=612x612&w=0&k=20&c=noILf6rTUyxN41JnmeFhUmqQWiCWoXlg0zCLtcrabD4="
          className="headerLogo"
          alt="logo"
        />
        <Select
          style={{
            width: "75%",
            backgroundColor: "black",
            color: "white",
            marginTop: "20px",
          }}
          onChange={(val) => setSelectedChain(val)}
          value={selectedChain}
          options={[
            {
              label: "Ethereum",
              value: "0x1",
            },
            {
              label: "Mumbai Testnet",
              value: "0x13881",
            },
            {
              label: "Polygon",
              value: "0x89",
            },
            {
              label: "Avalanche",
              value: "0xa86a",
            },
          ]}
          className="dropdown"
        ></Select>
      </header>
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
    </div>
  );
}
export default Home;

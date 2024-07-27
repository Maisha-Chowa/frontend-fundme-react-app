const Ethereum = {
  hex: "0x1",
  name: "Ethereum",
  rpcUrl: "",
  ticker: "ETH",
};

const MumbaiTestnet = {
  hex: "0x13881",
  name: "Mumbai Testnet",
  rpcUrl: "",
  ticker: "MATIC",
};
const SepoliaTestnet = {
  hex: "0xaa36a7",
  name: "Sepolia Testnet",
  rpcUrl:
    "https://eth-sepolia.g.alchemy.com/v2/8XUtW-KH3nVE7QFEQEYju_ftD8981F-T",
  ticker: "ETH",
};

export const CHAINS_CONFIG = {
  "0x1": Ethereum,
  "0x13881": MumbaiTestnet,
  "0xaa36a7": SepoliaTestnet,
};

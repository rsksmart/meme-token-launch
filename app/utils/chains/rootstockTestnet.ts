import { defineChain } from "thirdweb/chains";

export const RootstockTestnet = defineChain({
  id: 31,
  name: "Rootstock Testnet",
  shortName: "rootstock-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Rootstock Bitcoin",
    symbol: "tRBTC",
  },
  rpcUrls: {
    default: { http: ["https://public-node.testnet.rsk.co"] },
  },
  blockExplorers: {
    default: {
      name: "RSK Explorer",
      url: "https://explorer.testnet.rsk.co",
    },
  },
  testnet: true,
});
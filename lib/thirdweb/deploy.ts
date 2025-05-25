import {
    defineChain,
  } from "thirdweb";
  import {deployERC20Contract} from "thirdweb/deploys";
  import { Account, privateKeyToAccount } from "thirdweb/wallets";
import { client } from "./client";
  
  export async function deployERC20({ name, symbol, description }: { name: string, symbol: string, description: string }) {
    const chain  = defineChain(31); // Rootstock Testnet
  
    const account = privateKeyToAccount({
      client,
      privateKey: process.env.PRIVATE_KEY as string,
    });

    return await deployERC20Contract({
        chain,
        client,
        account,
        type: "TokenERC20",
        params: {
          name: name,
          description: description,
          symbol: symbol,
       }
    });
  }
  
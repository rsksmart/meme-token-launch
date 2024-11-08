import { useAuth } from "@/context/AuthContext";
import { useCallback, useState } from "react";
import { ethers } from "ethers";
import { DEPLOY_STRATEGY_ENUM } from "@/constants";
import DeflationaryTokenAbi from "@/contracts/abi/DeflationaryToken";
import InflationaryTokenAbi from "@/contracts/abi/InflationaryToken";
import ERC1155TokenAbi from "@/contracts/abi/ERC1155Token";
export type MintTokenParams = {
  contractAddress: string;
  strategy: DEPLOY_STRATEGY_ENUM;
  addressTo: string;
  amount: string;
  tokenId?: string;
}

const useMintToken = () => {
  const { signer } = useAuth();

  const [isError, setIsError] = useState(false)
  const [isMinted, setIsMinted] = useState(false)

  const [txHash, setTxHash] = useState()

  const strategyToABI:any = {
    [DEPLOY_STRATEGY_ENUM.DEFLATIONARY]: DeflationaryTokenAbi,
    [DEPLOY_STRATEGY_ENUM.INFLATIONARY]: InflationaryTokenAbi,
    [DEPLOY_STRATEGY_ENUM.ERC1155]: ERC1155TokenAbi,
  }

  const getABIByStrategy = (strategy: DEPLOY_STRATEGY_ENUM) => strategyToABI[strategy];

  const mint = useCallback(async ({ contractAddress, strategy, addressTo, amount, tokenId }: MintTokenParams) => {
    try {
      const contract = new ethers.Contract(contractAddress, getABIByStrategy(strategy), signer);
      let params;
      if(strategy === DEPLOY_STRATEGY_ENUM.ERC1155) {
        //NOTE data is set to '0x' for now, if you need to pass data, please add it here
        const tx = await contract.mint(addressTo, Number(tokenId), ethers.parseUnits(amount, 18), '0x');
        setTxHash(tx.hash)
        await tx.wait()
        setIsMinted(true)
      } else {
        const tx = await contract.mint(addressTo, ethers.parseUnits(amount, 18));
        setTxHash(tx.hash)
        await tx.wait()
        setIsMinted(true)
      }
    } catch (error) {
      setIsError(true)
      console.log('error: ', error)
    }
  }, [])

  return {
    mint,
    isError,
    setIsError,
    txHash,
    isMinted
  }
}

export default useMintToken
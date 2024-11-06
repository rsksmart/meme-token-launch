import { useAuth } from "@/context/AuthContext";
import { useCallback, useState } from "react";
import { ethers } from "ethers";
import { DEPLOY_STRATEGY_ENUM } from "@/constants";
import DeflationaryTokenAbi from "@/contracts/abi/DeflationaryToken";
import InflationaryTokenAbi from "@/contracts/abi/InflationaryToken";

export type MintTokenParams = {
  contractAddress: string;
  strategy: DEPLOY_STRATEGY_ENUM;
  addressTo: string;
  amount: string;
}

const useMintToken = () => {
  const { signer } = useAuth();

  const [isError, setIsError] = useState(false)
  const [isMinted, setIsMinted] = useState(false)

  const [txHash, setTxHash] = useState()

  const strategyToABI:any = {
    [DEPLOY_STRATEGY_ENUM.DEFLATIONARY]: DeflationaryTokenAbi,
    [DEPLOY_STRATEGY_ENUM.INFLATIONARY]: InflationaryTokenAbi
  }

  const getABIByStrategy = (strategy: DEPLOY_STRATEGY_ENUM) => strategyToABI[strategy];

  const mint = useCallback(async ({ contractAddress, strategy, addressTo, amount }: MintTokenParams) => {

    try {
      const contract = new ethers.Contract(contractAddress, getABIByStrategy(strategy), signer);

      const tx = await contract.mint(addressTo, ethers.parseUnits(amount, 18));

      setTxHash(tx.hash)

      await tx.wait()

      setIsMinted(true)
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
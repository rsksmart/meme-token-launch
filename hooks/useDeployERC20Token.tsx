import { useAuth } from "@/context/AuthContext";
import { useCallback, useState } from "react";
import { ethers } from "ethers";
import FACTORY_ABI from "../abi/TokenFactory";
import { DEPLOY_STRATEGY_ENUM } from "@/constants";

const FACTORY_ADDRESS = "0xdBd55bbE2A8f5cEb213Ef0f1ea27446b86f9E554"
const TOKEN_CREATED_EVENT = "TokenCreated"

type DeployERC20Params = {
  name: string;
  symbol: string;
  initialSupply: string;
  maxSupply: string;
}

export type DeployERC20Props = DeployERC20Params & {
  strategy: DEPLOY_STRATEGY_ENUM;
}


const useDeployERC20Token = () => {
  const { signer, address: signerAddress } = useAuth();

  const [isError, setIsError] = useState(false)
  const [contractAddress, setContractAddress] = useState()

  const factory = new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI, signer);

  const deployInflationaryToken = ({ name, symbol, initialSupply }: DeployERC20Params) => {
    const _initialSupply = ethers.parseUnits(initialSupply, 18); 
    return factory.createInflationaryToken(name, symbol, _initialSupply, signerAddress)
  }

  const deployDeflationaryToken = ({ name, symbol, initialSupply, maxSupply }: DeployERC20Params) => {
    const _initialSupply = ethers.parseUnits(initialSupply, 18); 
    const _maxSupply = ethers.parseUnits(maxSupply, 18);
    return factory.createDeflationaryToken(name, symbol, _initialSupply, _maxSupply, signerAddress)
  }

  const getContractAddress = async (tx: { hash: any; wait: () => any; }) => {
    const receipt = await tx.wait();

    for (const log of receipt.logs) {
      try {
        const parsedLog = factory.interface.parseLog(log);
        if (parsedLog && parsedLog.name === TOKEN_CREATED_EVENT) {
          const { tokenAddress } = parsedLog.args;
          return tokenAddress
        }
      } catch (error) {
        console.error("Failed to parse log:", error);
      }
    }
  }

  const strategyToFunctionMapper = {
    [DEPLOY_STRATEGY_ENUM.DEFLATIONARY]: deployDeflationaryToken,
    [DEPLOY_STRATEGY_ENUM.INFLATIONARY]: deployInflationaryToken
  }

  const deployERC20 = useCallback(async ({ name, symbol, maxSupply, initialSupply, strategy }: DeployERC20Props) => {
    const params: DeployERC20Params = {
      name,
      symbol,
      maxSupply,
      initialSupply
    }

    const tx = await strategyToFunctionMapper[strategy](params)
    const contractAddress = await getContractAddress(tx)
    setContractAddress(contractAddress);
  }, [])

  return {
    deployERC20,
    isError,
    setIsError,
    contractAddress
  }
}

export default useDeployERC20Token
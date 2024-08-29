import { useAuth } from "@/context/AuthContext";
import { useCallback, useState } from "react";
import { ethers } from "ethers";
import MemeTokenFactoryAbi from "@/contracts/abi/MemeTokenFactory";
import { DEPLOY_STRATEGY_ENUM } from "@/constants";

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
  const { signer, address: signerAddress, env } = useAuth();
  const {FACTORY_ADDRESS, TOKEN_CREATED_EVENT} = env;

  const [isError, setIsError] = useState(false)

  const [txHash, setTxHash] = useState()
  const [contractAddress, setContractAddress] = useState()

  const factory = new ethers.Contract(FACTORY_ADDRESS, MemeTokenFactoryAbi, signer);

  const deployInflationaryToken = ({ name, symbol, initialSupply }: DeployERC20Params) => {
    const _initialSupply = ethers.parseUnits(initialSupply, 18); 
    return factory.createInflationaryToken(name, symbol, _initialSupply, signerAddress, "")
  }

  const deployDeflationaryToken = ({ name, symbol, initialSupply, maxSupply }: DeployERC20Params) => {
    const _initialSupply = ethers.parseUnits(initialSupply, 18); 
    const _maxSupply = ethers.parseUnits(maxSupply, 18);
    return factory.createDeflationaryToken(name, symbol, _initialSupply, _maxSupply, signerAddress, "")
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
    setTxHash(tx.hash)

    const contractAddress = await getContractAddress(tx)
    setContractAddress(contractAddress);
  }, [])

  return {
    deployERC20,
    isError,
    setIsError,
    contractAddress,
    txHash
  }
}

export default useDeployERC20Token
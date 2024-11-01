import { useAuth } from "@/context/AuthContext";
import { useCallback, useState } from "react";
import { ethers } from "ethers";
import MemeTokenERC20FactoryAbi from "@/contracts/abi/MemeTokenERC20Factory";
import MemeTokenERC1155FactoryAbi from "@/contracts/abi/MemeTokenERC1155Factory";
import { DEPLOY_STRATEGY_ENUM } from "@/constants";
import { UploadImageIpfs } from "@/utils/PinataService";
import { sponsoredCall } from "@/utils/SponsoredCall";

type DeployERC20Params = {
  name: string;
  symbol: string;
  initialSupply: string;
  maxSupply: string;
  cid: string;
}
type DeployERC1155Params = {
  name: string;
  cid: string;
  tokenId: string;
  initialSupply: string;
}

export type DeployERC20Props = DeployERC20Params & {
  strategy: DEPLOY_STRATEGY_ENUM;
}

const useDeployToken = () => {
  const { signer, address: signerAddress, env } = useAuth();
  const { FACTORY_ADDRESS_ERC1155, FACTORY_ADDRESS_ERC20, TOKEN_CREATED_EVENT } = env;

  const [isError, setIsError] = useState(false)

  const [txHash, setTxHash] = useState()
  const [contractAddress, setContractAddress] = useState()

  const factoryERC20 = new ethers.Contract(FACTORY_ADDRESS_ERC20, MemeTokenERC20FactoryAbi, signer);
  const factoryERC1155 = new ethers.Contract(FACTORY_ADDRESS_ERC1155, MemeTokenERC1155FactoryAbi, signer);

  const deployInflationaryToken = async (
    { name, symbol, initialSupply, cid }: DeployERC20Params,
    gasless: boolean
  ) => {
    try {
      const _initialSupply = ethers.parseUnits(initialSupply, 18)
      if (gasless) {
        const txReceipt = await sponsoredCall(
          factoryERC20,
          'createInflationaryToken',
          [name, symbol, _initialSupply, signerAddress, cid],
          FACTORY_ADDRESS_ERC20
        )
        return txReceipt
      } else {
        return factoryERC20.createInflationaryToken(
          name,
          symbol,
          _initialSupply,
          signerAddress,
          cid
        )
      }
    } catch (error) {
      console.log('Error deploying inflationary token:', error)
    }
  }

  const deployDeflationaryToken = async (
    { name, symbol, initialSupply, maxSupply, cid }: DeployERC20Params,
    gasless: boolean
  ) => {
    try {
      const _initialSupply = ethers.parseUnits(initialSupply, 18)
      const _maxSupply = ethers.parseUnits(maxSupply, 18)
      if (gasless) {
        const txReceipt = await sponsoredCall(
          factoryERC20,
          'createDeflationaryToken',
          [name, symbol, _initialSupply, _maxSupply, signerAddress, cid],
          FACTORY_ADDRESS_ERC20
        )
        return txReceipt
      } else {
        return factoryERC20.createDeflationaryToken(
          name,
          symbol,
          _initialSupply,
          _maxSupply,
          signerAddress,
          cid
        )
      }
    } catch (error) {
      console.log('Error deploying deflationary token:', error)
    }
  }

  const erc1155Token = async (
    { name, cid }: DeployERC1155Params,
    gasless: boolean
  ) => {
    

  }

  const getContractAddress = async (tx: { hash: any; wait: () => any; logs?:any[]}, gasless: boolean) => {
    if(gasless) {
      if(!tx.logs) {
        console.log('No logs found in tx');
        return
      }
      for (const log of tx.logs) {
        try {
          const parsedLog = factoryERC20.interface.parseLog(log);
          if (parsedLog && parsedLog.name === TOKEN_CREATED_EVENT) {
            const { tokenAddress } = parsedLog.args;
            return tokenAddress
          }
        } catch (error) {
          console.error("Failed to parse log:", error);
        }
      }
    } else {
      const receipt = await tx.wait();
  
      for (const log of receipt.logs) {
        try {
          const parsedLog = factoryERC20.interface.parseLog(log);
          if (parsedLog && parsedLog.name === TOKEN_CREATED_EVENT) {
            const { tokenAddress } = parsedLog.args;
            return tokenAddress
          }
        } catch (error) {
          console.error("Failed to parse log:", error);
        }
      }
    }
  }

  const strategyToFunctionMapper = {
    [DEPLOY_STRATEGY_ENUM.DEFLATIONARY]: deployDeflationaryToken,
    [DEPLOY_STRATEGY_ENUM.INFLATIONARY]: deployInflationaryToken
  }

  const deployERC20 = useCallback(async ({ name, symbol, maxSupply, initialSupply, strategy, cid }: DeployERC20Props, gasless: boolean) => {
    const params: DeployERC20Params = {
      name,
      symbol,
      maxSupply,
      initialSupply,
      cid
    }
    console.log('params for the token are :', params);
    
    const tx = await strategyToFunctionMapper[strategy](params, gasless)
    setTxHash(gasless ?  tx.transactionHash : tx.hash)
    const contractAddress = await getContractAddress(tx, gasless)
    setContractAddress(contractAddress);
  }, [])

  // const deployERC1155 = useCallback(async () => {
  //   console.log('deploying erc1155 token')

  // })

  return {
    deployERC20,
    isError,
    setIsError,
    contractAddress,
    txHash
  }
}

export default useDeployToken
import { useState, useCallback } from 'react'
import { ethers, Signer } from 'ethers'
import { useAuth } from '@/context/AuthContext'
import MemeTokenERC20FactoryAbi from '@/contracts/abi/MemeTokenERC20Factory'
import MemeTokenERC1155FactoryAbi from '@/contracts/abi/MemeTokenERC1155Factory'
import { ContractInfo, DEPLOY_STRATEGY_ENUM, Token } from '@/constants'
import DeflationaryTokenAbi from '@/contracts/abi/DeflationaryToken'
import InflationaryTokenAbi from '@/contracts/abi/InflationaryToken'
import ERC1155TokenAbi from '@/contracts/abi/ERC1155Token'

const useConnectWallet = () => {
  const {
    setAddress,
    setIsLoggedIn,
    setSigner,
    setTokens,
    tokens,
    env: { FACTORY_ADDRESS_ERC1155, FACTORY_ADDRESS_ERC20 },
  } = useAuth()

  const [isError, setIsError] = useState(false)
  const [provider, setProvider] = useState<ethers.BrowserProvider | undefined>()

  const strategyToTokenABI = {
    [DEPLOY_STRATEGY_ENUM.DEFLATIONARY]: DeflationaryTokenAbi,
    [DEPLOY_STRATEGY_ENUM.INFLATIONARY]: InflationaryTokenAbi,
    [DEPLOY_STRATEGY_ENUM.ERC1155]: ERC1155TokenAbi,
  }

  const populateTokensListFromOwner = async (
    signer: Signer,
    address: string
  ) => {
    try {
      //erc20
      //TODO read from erc1155 also
      const factoryERC20 = new ethers.Contract(
        FACTORY_ADDRESS_ERC20,
        MemeTokenERC20FactoryAbi,
        signer
      )
      const factoryERC1155 = new ethers.Contract(
        FACTORY_ADDRESS_ERC1155,
        MemeTokenERC1155FactoryAbi,
        signer
      )

      const erc20Tokens = await fetchTokens(factoryERC20, address, signer, 'erc20');
      const erc1155Tokens = await fetchTokens(factoryERC1155, address, signer, 'erc1155')
      if (erc20Tokens && erc1155Tokens) {
        setTokens([...erc20Tokens, ...erc1155Tokens])
      }
    } catch (error) {
      console.error('Error populating tokens list', error)
    }
  }

  const fetchTokens = async (
    factory: ethers.Contract,
    address: string,
    signer: Signer,
    type: 'erc20' | 'erc1155'
  ): Promise<Token[] | undefined> => {
    try {
      const tokenAddresses: string[] = await factory.getTokensForOwner(address)
      const _tokens: Token[] = []
      await Promise.all(
        tokenAddresses.map(async (tokenAddress) => {
          const contractInfo: ContractInfo = await factory.tokenToContractInfo(
            tokenAddress
          )
          let currentSupply;
          let strategy
          if(type === 'erc20'){
            strategy =
              contractInfo.strategy == 0
                ? DEPLOY_STRATEGY_ENUM.INFLATIONARY
                : DEPLOY_STRATEGY_ENUM.DEFLATIONARY
              const tokenContract = new ethers.Contract(
                tokenAddress,
                strategyToTokenABI[strategy],
                signer
              )
            currentSupply = await tokenContract.totalSupply()
          } else if (type === 'erc1155'){
            strategy = DEPLOY_STRATEGY_ENUM.ERC1155
            currentSupply = 0
          }
          if(!strategy){
            console.error('Error populating tokens list: strategy not found')
            return
          }
          const token: Token = {
            name: contractInfo.name,
            address: tokenAddress,
            symbol: contractInfo.symbol,
            initialSupply: ethers.formatEther(contractInfo.initialSupply),
            currentSupply: ethers.formatEther(currentSupply),
            maxSupply: ethers.formatEther(contractInfo.maxSupply),
            uri: contractInfo.uri,
            strategy,
          }

          _tokens.push(token)
        })
      )
      return _tokens
    } catch (error) {
      console.error('Error populating tokens list', error)
    }
  }

  const login = useCallback(async () => {
    const { ethereum } = window as any

    try {
      const provider = new ethers.BrowserProvider(ethereum)
      const signer = await provider.getSigner()
      const address = await signer.getAddress()

      await populateTokensListFromOwner(signer, address)

      setIsLoggedIn(true)
      setAddress(address)
      setSigner(signer)
      setProvider(provider)
    } catch (error) {
      console.error('Error connecting to wallet', error)
      setIsError(!ethereum)
    }
  }, [])

  return {
    login,
    populateTokensListFromOwner,
    provider,
    isError,
    setIsError,
  }
}

export default useConnectWallet

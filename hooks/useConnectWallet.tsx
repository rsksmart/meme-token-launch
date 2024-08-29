import { useState, useCallback } from 'react'
import { ethers, Signer } from 'ethers'
import { useAuth } from '@/context/AuthContext'
import MemeTokenFactoryAbi from '@/contracts/abi/MemeTokenFactory'
import { ContractInfo, DEPLOY_STRATEGY_ENUM, Token } from '@/constants'

const useConnectWallet = () => {
  const { setAddress, setIsLoggedIn, setSigner, setTokens, tokens, env: { FACTORY_ADDRESS } } = useAuth()

  const [isError, setIsError] = useState(false)
  const [provider, setProvider] = useState<
    ethers.BrowserProvider | undefined
  >()

  const populateTokensListFromOwner = async (signer: Signer, address: string) => {
    const factory = new ethers.Contract(FACTORY_ADDRESS, MemeTokenFactoryAbi, signer);
    const tokenAddresses: string[] = await factory.getTokensForOwner(address);

    const _tokens: Token[] = []

    await Promise.all(
      tokenAddresses.map(async (tokenAddress) => {
        const contractInfo: ContractInfo = await factory.tokenToContractInfo(tokenAddress)
        console.log(contractInfo.strategy )
        const token: Token = {
          name: contractInfo.name,
          address: tokenAddress,
          symbol: contractInfo.symbol,
          initialSupply: contractInfo.initialSupply,
          maxSupply: contractInfo.maxSupply,
          uri: contractInfo.uri,
          strategy: contractInfo.strategy == 0 ? DEPLOY_STRATEGY_ENUM.INFLATIONARY : DEPLOY_STRATEGY_ENUM.DEFLATIONARY
        }
        _tokens.push(token)
      }))

    setTokens([..._tokens])
  }

  const login = useCallback(async () => {
    const { ethereum } = window as any

    try {
      const provider = new ethers.BrowserProvider(ethereum)
      const signer = await provider.getSigner()
      const address = await signer.getAddress()

      await populateTokensListFromOwner(signer, address);

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
    setIsError
  }
}

export default useConnectWallet

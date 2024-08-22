import { useState, useCallback } from 'react'
import { ethers } from 'ethers'

import { useAuth } from '@/context/AuthContext'

const useConnectWallet = () => {
  const { setAddress, setIsLoggedIn, setSigner } = useAuth()

  const [isError, setIsError] = useState(false)
  const [provider, setProvider] = useState<
    ethers.BrowserProvider | undefined
  >()

  const login = useCallback(async () => {
    const { ethereum } = window as any

    try {
      const provider = new ethers.BrowserProvider(ethereum)
      const signer = await provider.getSigner()
      const address = await signer.getAddress()

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
    provider,
    isError,
    setIsError
  }
}

export default useConnectWallet

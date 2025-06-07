import { EtherspotBundler, MetaMaskWalletProvider, PrimeSdk, WalletProviderLike } from "@etherspot/prime-sdk"
import axios from "axios"
import { ethers } from "ethers"

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const sponsoredCall = async (
  contract: ethers.Contract,
  functionName: string,
  callParams: any[],
  contractAddress: string,
) => {

  try {
    const metamaskProvider = await MetaMaskWalletProvider.connect()
    const bundlerApiKey = process.env.NEXT_PUBLIC_BUNDLER_API_KEY
    const customBundlerUrl = process.env.NEXT_PUBLIC_CUSTOM_BUNDLER_URL
    const chainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID)
    const apiKey = process.env.NEXT_PUBLIC_ARKA_PUBLIC_KEY
    if (
      !metamaskProvider ||
      !bundlerApiKey ||
      !customBundlerUrl ||
      !chainId ||
      !apiKey
    ) {
      throw new Error(`Missing data for execution: ${metamaskProvider}, ${bundlerApiKey}, ${customBundlerUrl}, ${chainId}, ${apiKey}`)
    }

    const primeSdk = new PrimeSdk(metamaskProvider, {
      chainId: chainId,
      bundlerProvider: new EtherspotBundler(
        chainId,
        bundlerApiKey,
        customBundlerUrl
      ),
    })

    const smartAddress = await primeSdk.getCounterFactualAddress();
    const balance = await primeSdk.getNativeBalance()
    const headers = { 'Content-Type': 'application/json' }    
    const bodyCheckWhitelist = {
      "params": [smartAddress]
    }
    const isWhitelisted = await axios.post(`https://arka.etherspot.io/checkWhitelist?apiKey=${apiKey}&chainId=${chainId}`, bodyCheckWhitelist, { headers: headers })

    if (isWhitelisted.data.message !== "Already added") {
      const body = {
        "params": [[smartAddress]]
      }
      const responseWhitelist = await axios.post(`https://arka.etherspot.io/whitelist?apiKey=${apiKey}&chainId=${chainId}`, body, { headers: headers })
    }
    const encodedData = contract.interface.encodeFunctionData(
      functionName,
      callParams
    )
    await primeSdk.addUserOpsToBatch({
      to: contractAddress,
      data: encodedData,
    })
    const op = await primeSdk.estimate({
      paymasterDetails: {
        url: `https://arka.etherspot.io?apiKey=${apiKey}&chainId=${chainId}`,
        context: { mode: 'sponsor' },
      },
    })
    const uoHash = await primeSdk.send(op)
    let userOpsReceipt = null
    const timeout = Date.now() + 180000 // 3 minutes timeout

    while (userOpsReceipt == null && Date.now() < timeout) {
      await wait(5000)
      userOpsReceipt = await primeSdk.getUserOpReceipt(uoHash)
    }
    return userOpsReceipt.receipt
  } catch (error) {
    console.log('error: ', error)
    throw new Error('Error executing sponsored call: ' + error)
  }
}

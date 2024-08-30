import { EtherspotBundler, PrimeSdk, WalletProviderLike } from "@etherspot/prime-sdk"
import axios from "axios"
import { ethers } from "ethers"

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const sponsoredCall = async (
  walletProviderLike: WalletProviderLike,
  contract: ethers.Contract,
  functionName: string,
  callParams: [],
  contractAddress: string,
) => {

  try {
    const bundlerApiKey = process.env.BUNDLER_API_KEY
    const customBundlerUrl = process.env.CUSTOM_BUNDLER_URL
    const chainId = Number(process.env.CHAIN_ID)
    const apiKey = process.env.ARKA_PUBLIC_KEY
    if (
      !bundlerApiKey ||
      !customBundlerUrl ||
      !chainId ||
      !apiKey
    ) {
      throw new Error('Missing data for RNSDomain claimer execution')
    }

    const primeSdk = new PrimeSdk(walletProviderLike, {
      chainId: chainId,
      bundlerProvider: new EtherspotBundler(
        chainId,
        bundlerApiKey,
        customBundlerUrl
      ),
    })

    const smartAddress = await primeSdk.getCounterFactualAddress();
    console.log(`EtherspotWallet address: ${smartAddress}`);
    const balance = await primeSdk.getNativeBalance()
    console.log('balance is:', balance)
    const headers = { 'Content-Type': 'application/json' }    
    const bodyCheckWhitelist = {
      "params": [smartAddress]
    }
    const isWhitelisted = await axios.post(`https://arka.etherspot.io/checkWhitelist?apiKey=${apiKey}&chainId=${chainId}`, bodyCheckWhitelist, { headers: headers })
    console.log('isWhitelisted:', isWhitelisted);
    console.log('isWhitelisted:', isWhitelisted.data.message);

    if (isWhitelisted.data.message !== "Already added") {
      console.log('Whitelisting address');
      const body = {
        "params": [[smartAddress]]
      }
      const responseWhitelist = await axios.post(`https://arka.etherspot.io/whitelist?apiKey=${apiKey}&chainId=${chainId}`, body, { headers: headers })
      console.log('responseWhitelist:', responseWhitelist);
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
      console.log('Waiting for transaction...')
      await wait(5000)
      userOpsReceipt = await primeSdk.getUserOpReceipt(uoHash)
    }
    console.log('\x1b[33m%s\x1b[0m', `Transaction Receipt: `, userOpsReceipt)
    return userOpsReceipt
  } catch (error) {
    console.log('error: ', error)
    throw new Error('Error executing sponsored call: ' + error)
  }
}

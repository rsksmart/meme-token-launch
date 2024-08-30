import React, { useEffect, useState } from 'react'
import BaseDialog from '@/components/ui/dialog/baseDialog'
import { MetamaskIcon, ErrorCircleIcon, CheckCircleIcon, CopyIcon, InfoCircleIcon } from '@/components/icons'
import useDeployERC20Token, { DeployERC20Props } from '@/hooks/useDeployERC20Token'
import { copyToClipboard, formatAddress } from '@/lib/utils'
import { Tooltip, TooltipTrigger } from '../tooltip'
import { useAuth } from '@/context/AuthContext'
import { DeployFormData } from '@/components/deployToken'
import { UploadImageIpfs } from '@/utils/PinataService'

type props = {
  closeDialog: Function
  open: boolean
  params: DeployFormData
}

function DeployERC20TokenDialog({ closeDialog, open, params }: props) {
  const { env } = useAuth();
  const { deployERC20, isError, setIsError, contractAddress, txHash } = useDeployERC20Token();
  const [isDeployed, setIsDeployed] = useState<boolean>(false)

  const [txHashCopied, setTxHashCopied] = useState(false);
  const [contractAddressCopied, setContractAddressCopied] = useState(false);


  useEffect(() => {
    if (txHashCopied) {
      const timer = setTimeout(() => {
        setTxHashCopied(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [txHashCopied]);

  useEffect(() => {
    if (contractAddressCopied) {
      const timer = setTimeout(() => {
        setContractAddressCopied(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [contractAddressCopied]);

  useEffect(() => {
    if (!isDeployed && !contractAddress) {
      init()
    }

    if (contractAddress) {
      setIsDeployed(true)
      setIsError(false)
    }
  }, [contractAddress])

  const deployFormDataToProps = async ({image, strategy, name, symbol, maxSupply, initialSupply}: DeployFormData) => {
    var cid  = "";

    if(image) {
      const cid = await UploadImageIpfs(image)
      if(!cid) {
        console.log('Error uploading image to IPFS');
        setIsError(true)
      }
    }

    return {
      strategy,
      name,
      symbol,
      maxSupply,
      initialSupply,
      cid
    } as DeployERC20Props
  }

  const init = () => {
    setIsError(false)
    try {
      setTimeout(async () => {
        const props = await deployFormDataToProps(params)
        deployERC20(props)
      }, 1500)
    } catch (error: any) {
      setIsError(true)
      console.log('Error: ', error)
    }
  }

  return (

    <BaseDialog
      closeDialog={closeDialog}
      open={open}
      className={isDeployed ? "w-[500px] " : "w-[500px] h-[350px]"}
    >
      {isDeployed ? (
        <div className="flex flex-col items-center">
          <h2 className="text-2xl text-slate-100 text-center font-semibold mb-6 mt-6">
            Contract deployed!
          </h2>
          <CheckCircleIcon className="w-[70px] h-[70px] text-custom-green" />
          <div className='w-full flex flex row items-center justify-center text-xl mt-6'>
            Transaction id:
            <a
              href={env.EXPLORER_TX_BASE_URL + txHash}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-500 ml-3"
            >
              {formatAddress(txHash!)}
            </a>
            <div className='ml-2 flex items-center'>
              <Tooltip >
                <TooltipTrigger>
                  {txHashCopied ? (
                    <CheckCircleIcon
                      onClick={() => {
                        copyToClipboard(txHash!);
                      }}
                      className="w-5 h-5 text-green-500"
                    ></CheckCircleIcon>
                  ) : (
                    <CopyIcon
                      onClick={() => {
                        copyToClipboard(txHash!);
                        setTxHashCopied(true);
                      }}
                      className="w-5 h-5 hover:text-white cursor-pointer"
                    />
                  )}
                </TooltipTrigger>
              </Tooltip>
            </div>
          </div>
          <div className='w-full flex flex row items-center justify-center text-xl'>
            Contract address:
            <a
              href={env.EXPLORER_ADDRESS_BASE_URL + contractAddress}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-500 ml-3"
            >
              {formatAddress(contractAddress!)}
            </a>
            <div className='ml-2 flex items-center'>
              <Tooltip >
                <TooltipTrigger>
                  {contractAddressCopied ? (
                    <CheckCircleIcon
                      onClick={() => {
                        copyToClipboard(contractAddress!);
                      }}
                      className="w-5 h-5 text-green-500"
                    ></CheckCircleIcon>
                  ) : (
                    <CopyIcon
                      onClick={() => {
                        copyToClipboard(contractAddress!);
                        setContractAddressCopied(true);
                      }}
                      className="w-5 h-5 hover:text-white cursor-pointer"
                    />
                  )}
                </TooltipTrigger>
              </Tooltip>
            </div>
          </div>
          <div className='w-full  mt-8 '>
            <div className='bg-custom-cyan rounded-md w-full p-4 px-6 flex flex-col gap-2 text-black'>
              <div className='text-xl w-full flex flex-row items-center gap-2'>
                <InfoCircleIcon className='w-5 h-5' /> Info
              </div>
              <div className='ml-6'>
                <ul className="list-disc">
                  <li>{"Make sure that you've save a copy of the contract address. You could lost access to your tokens."}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {!isError ? (
            <div className='flex flex-col justify-center items-center'>
              <h2 className="text-2xl text-slate-100 text-center font-semibold mb-8 mt-6">
                Deploying contract
              </h2>
              <div className="relative flex justify-center items-center">
                <MetamaskIcon className="w-[70px] h-[70px] absolute" />
                <div className="animate-spin border border-r-slate-300 w-[140px] h-[140px] rounded-full"></div>
              </div>
              { txHash && (
                <a
                  href={env.EXPLORER_TX_BASE_URL + txHash}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl underline hover:text-orange-500 mt-8 font-bold"
                >
                  View transaction on explorer
                </a>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <h2 className="text-xl text-slate-100 text-center font-semibold mb-10 mt-6">
                Ups! Something went wrong during the deployment
              </h2>
              <ErrorCircleIcon className="w-[100px] h-[100px]" />
              <a
                href={env.EXPLORER_TX_BASE_URL + txHash}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl underline hover:text-orange-500 mt-8 font-bold"
              >
                View transaction on explorer
              </a>
            </div>
          )}
        </div>
      )}
    </BaseDialog>
  )
}

export default DeployERC20TokenDialog

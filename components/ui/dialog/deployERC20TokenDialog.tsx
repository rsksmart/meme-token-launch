import React, { useEffect, useState } from 'react'
import BaseDialog from '@/components/ui/dialog/baseDialog'
import {MetamaskIcon, ErrorCircleIcon, CheckCircleIcon} from '@/components/icons'
import useDeployERC20Token, { DeployERC20Props } from '@/hooks/useDeployERC20Token'

type props = {
  closeDialog: Function
  open: boolean
  params: DeployERC20Props
}

const TX_URL = "https://explorer.testnet.rootstock.io/tx/"
const ADDRESS_URL = "https://explorer.testnet.rootstock.io/address/"

function DeployERC20TokenDialog({ closeDialog, open, params }: props) {
  const { deployERC20, isError, setIsError, contractAddress } = useDeployERC20Token();
  const [isDeployed, setIsDeployed] = useState<boolean>(false)

  useEffect(() => {
    if (!isDeployed && !contractAddress) {
      init()
    }

    if (contractAddress) {
      setIsDeployed(true)
      setIsError(false)
    }
  }, [contractAddress])

  const init = () => {
    setIsError(false)
    try {
      setTimeout(() => {
        deployERC20(params)
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
      className="w-[500px] h-[350px]"
    >
      {isDeployed ? (
        <div className="flex flex-col items-center">
          <h2 className="text-xl text-slate-100 text-center font-semibold mb-10 mt-10">
            Contract deployed!
          </h2>
          <CheckCircleIcon className="w-[100px] h-[100px]" />
          <a
            href={ADDRESS_URL + contractAddress}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl underline hover:text-orange-500 mt-8 font-bold"
          >
            See contract
          </a>
        </div>
      ) : (
        <div>
          {!isError ? (
            <div>
              <h2 className="text-2xl text-slate-100 text-center font-semibold mb-10 mt-6">
                Deploying contract
              </h2>
              <div className="relative flex justify-center items-center">
                <MetamaskIcon className="w-[100px] h-[100px] absolute" />
                <div className="animate-spin border border-r-slate-300 w-[200px] h-[200px] rounded-full"></div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <h2 className="text-xl text-slate-100 text-center font-semibold mb-10 mt-6">
                Ups! Something went wrong during the deployment
              </h2>
              <ErrorCircleIcon className="w-[100px] h-[100px]" />
              <a
                href={TX_URL + ""} // TODO add transaction here
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl underline hover:text-orange-500 mt-8 font-bold"
              >
                See transaction
              </a>
            </div>
          )}
        </div>
      )}
    </BaseDialog>
  )
}

export default DeployERC20TokenDialog

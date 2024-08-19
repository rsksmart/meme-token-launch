import React, { useEffect, useState } from 'react'
import BaseDialog from '@/components/ui/dialog/baseDialog'
import MetamaskIcon from '@/components/icons/Metamask'
import useDeployERC20Token, { DeployERC20Props } from '@/app/utils/hooks/useDeployERC20Token'
import ErrorCircle from '@/components/icons/ErrorCircle'
import CheckCircle from '@/components/icons/CheckCircle'

type props = {
  closeDialog: Function
  open: boolean
  params: DeployERC20Props
}

const TX_URL = "https://explorer.testnet.rootstock.io/tx/"
const ADDRESS_URL = "https://explorer.testnet.rootstock.io/address/"

function DeployERC20TokenDialog({ closeDialog, open, params }: props) {
  const { deployERC20, isError, setIsError, address } = useDeployERC20Token();
  const [isDeployed, setIsDeployed] = useState<boolean>(false)

  useEffect(() => {
    if (!isDeployed && !address) {
      init()
    }

    if (address) {
      setIsDeployed(true)
      alert(address)
      setIsError(false)
    }
  }, [address])

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
          <CheckCircle className="w-[100px] h-[100px]" />
          <a
            href={ADDRESS_URL + address}
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
              <ErrorCircle className="w-[100px] h-[100px]" />
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

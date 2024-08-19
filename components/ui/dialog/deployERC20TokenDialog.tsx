import React, { useEffect, useState } from 'react'
import BaseDialog from '@/components/ui/dialog/baseDialog'
import MetamaskIcon from '@/components/icons/Metamask'
import useConnectWallet from '@/app/utils/hooks/useConnectWallet'
import useDeployERC20Token, { DeployERC20Props } from '@/app/utils/hooks/useDeployERC20Token'

type props = {
  closeDialog: Function
  open: boolean
  params: DeployERC20Props
}

function DeployERC20TokenDialog({ closeDialog, open, params }: props) {
  const { deployERC20, isError, setIsError, address } = useDeployERC20Token();
  const [isDeployed, setIsDeployed] = useState<boolean>(false)

  useEffect(() => {
    init()
    if(isDeployed) {
      closeDialog()
      setIsError(false)
    }
  }, [isDeployed])

  const init = () => {
    setIsError(false)
    try {
      setTimeout(() => {
        deployERC20(params)
        alert(address)
        setIsDeployed(true)
      }, 1500)
    } catch (error: any) {
      setIsError(true)
      console.log('error: ', error)
    }
  }

  return (
    <BaseDialog
      closeDialog={closeDialog}
      open={open}
      className="w-[500px] h-[350px]"
    >
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
            Make sure you have metamask in your browser
          </h2>
          <MetamaskIcon className="w-[100px] h-[100px]" />
          <a
            href="https://metamask.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="italic hover:underline mt-4 font-bold"
          >
            get Metamask
          </a>
        </div>
      )}
    </BaseDialog>
  )
}

export default DeployERC20TokenDialog

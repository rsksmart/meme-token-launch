import React, { useEffect } from 'react'

import BaseDialog from '@/components/ui/dialog/baseDialog'
import { MetamaskIcon } from '@/components/icons'
import useConnectWallet from '@/hooks/useConnectWallet'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { ROUTER } from '@/constants'

type props = {
  closeDialog: Function
  open: boolean
  route?: string
}

function ConnectWalletDialog({ closeDialog, open, route }: props) {
  const { login, provider, isError, setIsError } = useConnectWallet()
  const { isLoggedIn, login: authLogin } = useAuth()

  const router = useRouter()

  useEffect(() => {
    init()
    if (isLoggedIn) {
      authLogin(provider!)
      if(route) {
        router.push(route)
      }
      closeDialog()
      setIsError(false)
    }
  }, [isLoggedIn, authLogin, router])

  const init = () => {
    setIsError(false)
    try {
      setTimeout(() => {
        login()
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
            Connecting wallet
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

export default ConnectWalletDialog

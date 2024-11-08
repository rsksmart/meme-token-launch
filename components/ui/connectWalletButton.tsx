'use client'

import React, { useState } from 'react'
import ConnectWalletDialog from '@/components/ui/dialog/connectWalletDialog'
import { MetamaskIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'


type Props = {
  title?: string
  className?: string
  route?: string
}

const variants = cva(
  "bg-white text-2xl text-black before:w-full active:bg-slate-400",
);


const ConnectWalletButton = ({ title = 'Connect wallet', className, route }: Props) => {
  const [dialog, setDialog] = useState<boolean>(false)

  return (
    <div>
      {dialog && (
        <ConnectWalletDialog
          closeDialog={() => setDialog(false)}
          open={dialog}
          route={route}
        />
      )}
      <Button
        className={cn(variants(), className)}
        type="submit"
        variant={'outline'}
        onClick={() => setDialog(true)}
      >
        <MetamaskIcon className="w-5 h-5 mr-2" /> {title}
      </Button>
    </div>
  )
}

export default ConnectWalletButton

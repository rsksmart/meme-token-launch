'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import MintTokenDialog from '@/components/ui/dialog/mintTokenDialog'
import { DEPLOY_STRATEGY_ENUM } from '@/constants'

type Props = {
  disabled?: boolean
  address: string
  strategy: DEPLOY_STRATEGY_ENUM
}

const MintTokenButton = ({ disabled, address, strategy }: Props) => {
  const [dialog, setDialog] = useState<boolean>(false)

  return (
    <div className={ disabled ? "cursor-not-allowed" : "" }>
      {dialog && (
        <MintTokenDialog
          closeDialog={() => setDialog(false)}
          open={dialog}
          address={address}
          strategy={strategy}
        />
      )}
      <Button
        onClick={() => setDialog(true)}
        type="submit"
        disabled={disabled}
        variant={'outline'}
        className="w-32 bg-white text-xl text-black before:w-full active:bg-slate-400 z-10"
      >
        Mint
      </Button>
    </div>
  )
}

export default MintTokenButton

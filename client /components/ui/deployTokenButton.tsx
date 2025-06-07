'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import DeployTokenDialog from '@/components/ui/dialog/deployTokenDialog'
import { DeployFormData } from '@/components/deployToken'

type Props = {
  disabled: boolean
  gasless: boolean
  params: DeployFormData
  erc20: boolean
  erc1155: boolean
}

const DeployTokenButton = ({disabled, params, gasless, erc1155, erc20}: Props) => {
  const [dialog, setDialog] = useState<boolean>(false)

  return (
    <div>
      {dialog && (
        <DeployTokenDialog
          closeDialog={() => setDialog(false)}
          open={dialog}
          params={params}
          gasless={gasless}
          erc20={erc20}
          erc1155={erc1155}
        />
      )}
      <Button
        className="w-32 bg-white text-2xl text-black before:w-28 active:bg-slate-400"
        type="submit"
        disabled={disabled}
        variant={'outline'}
        onClick={() => setDialog(true)}
      >
        Deploy
      </Button>
    </div>
  )
}

export default DeployTokenButton

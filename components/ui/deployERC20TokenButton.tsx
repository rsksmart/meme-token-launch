'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import DeployERC20TokenDialog from '@/components/ui/dialog/deployERC20TokenDialog'
import { DeployERC20Props } from '@/hooks/useDeployERC20Token'

type Props = {
  disabled: boolean
  params: DeployERC20Props
  gasless: boolean
}

const DeployERC20TokenButton = ({disabled, params, gasless}: Props) => {
  const [dialog, setDialog] = useState<boolean>(false)

  return (
    <div>
      {dialog && (
        <DeployERC20TokenDialog
          closeDialog={() => setDialog(false)}
          open={dialog}
          params={params}
          gasless={gasless}
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

export default DeployERC20TokenButton

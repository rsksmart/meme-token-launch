'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import DeployERC20TokenDialog from '@/components/ui/dialog/deployERC20TokenDialog'
import { DeployERC20Props } from '@/app/utils/hooks/useDeployERC20Token'

type Props = {
  params: DeployERC20Props
}

const DeployERC20TokenButton = ({params}: Props) => {
  const [dialog, setDialog] = useState<boolean>(false)

  return (
    <div className="">
      {dialog && (
        <DeployERC20TokenDialog
          closeDialog={() => setDialog(false)}
          open={dialog}
          params={params}
        />
      )}
      <Button
        className="mt-5 w-32 bg-white text-2xl text-black before:w-28 active:bg-slate-400"
        type="submit"
        variant={'outline'}
        onClick={() => setDialog(true)}
      >
        Deploy
      </Button>
    </div>
  )
}

export default DeployERC20TokenButton

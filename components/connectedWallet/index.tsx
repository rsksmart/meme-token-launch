'use client'
import React from 'react'
import MetamaskIcon from '@/components/icons/MetamaskIcon'
import { Button } from '@/components/ui/button'
import { formatAddress } from '@/lib/utils'
import { useAuth } from '@/app/context/AuthContext'

const ConnectedWallet: React.FC = () => {
    const { address } = useAuth()

    return (
        <div className="">
            <Button
                className="mt-10 bg-white text-2xl text-black before:w-[228px] active:bg-slate-400"
                type="submit"
                variant={'outline'}
            >
                <MetamaskIcon className="w-5 mr-2" /> 
                <div className="w-full">{formatAddress(address)}</div>
            </Button>
        </div>
    )
}

export default ConnectedWallet

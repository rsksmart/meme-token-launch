import React, { useEffect, useState } from 'react'
import BaseDialog from '@/components/ui/dialog/baseDialog'
import {
  MetamaskIcon,
  ErrorCircleIcon,
  CheckCircleIcon,
  CopyIcon,
  HelpCircleIcon,
} from '@/components/icons'
import { copyToClipboard, formatAddress } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip'
import { useAuth } from '@/context/AuthContext'
import { Button } from '../button'
import useMintToken, { MintTokenParams } from '@/hooks/useMintToken'
import { DEPLOY_STRATEGY_ENUM } from '@/constants'
import ConnectWalletButton from '../connectWalletButton'

type props = {
  closeDialog: Function
  open: boolean
  address: string
  strategy: DEPLOY_STRATEGY_ENUM
}

function MintTokenDialog({ closeDialog, open, address, strategy }: props) {
  const { isLoggedIn, env } = useAuth()
  const { mint, isError, setIsError, txHash, isMinted } = useMintToken()
  const [isMinting, setIsMinting] = useState(false)
  const [isFormCompleted, setIsFormCompleted] = useState(false)
  const [contractAddressCopied, setContractAddressCopied] = useState(false)

  useEffect(() => {
    if (contractAddressCopied) {
      const timer = setTimeout(() => {
        setContractAddressCopied(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [contractAddressCopied])

  const [formData, setFormData] = useState({
    addressTo: '',
    amount: '',
    tokenId: '0',
  })

  const hasEmptyField = () => {
    return Object.entries(formData).some(([key, value]) => value === '')
  }

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  useEffect(() => {
    setIsFormCompleted(!hasEmptyField())
  }, [formData])

  const handleSubmit = () => {
    setIsMinting(true)
    try {
      setTimeout(async () => {
        const params: MintTokenParams = {
          contractAddress: address,
          strategy: strategy,
          addressTo: formData.addressTo,
          amount: formData.amount,
          tokenId: formData.tokenId,
        }
        await mint(params)
        setIsMinting(false)
      }, 1500)
    } catch (error: any) {
      setIsMinting(false)
      setIsError(true)
      console.log('error: ', error)
    }
  }

  return (
    <BaseDialog
      closeDialog={closeDialog}
      open={open}
      className={
        (isMinting || isError || isMinted
          ? 'h-[350px] w-[500px]'
          : strategy === DEPLOY_STRATEGY_ENUM.ERC1155
          ? 'h-[600px] w-[600px]'
          : 'h-[500px] w-[600px]') + ' text-white'
      }
    >
      {isError || isMinted ? (
        <div className="flex flex-col items-center">
          <h2 className="text-2xl text-slate-100 text-center font-semibold mb-6 mt-8">
            {isMinted ? 'Token minted!' : 'Ups! Something went wrong'}
          </h2>

          <>
            {isMinted ? (
              <CheckCircleIcon className="w-[140px] h-[140px] text-custom-green" />
            ) : (
              <ErrorCircleIcon className="w-[140px] h-[140px]" />
            )}
          </>
          <a
            href={env.EXPLORER_TX_BASE_URL + txHash}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl underline hover:text-orange-500 mt-8 font-bold"
          >
            View transaction on explorer
          </a>
        </div>
      ) : (
        <div>
          {isMinting ? (
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-2xl text-slate-100 text-center font-semibold mb-6 mt-8">
                Minting token
              </h2>
              <div className="relative flex justify-center items-center">
                <MetamaskIcon className="w-[70px] h-[70px] absolute" />
                <div className="animate-spin border border-r-slate-300 w-[140px] h-[140px] rounded-full"></div>
              </div>
              {txHash && (
                <a
                  href={env.EXPLORER_TX_BASE_URL + txHash}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl underline hover:text-orange-500 mt-4 font-bold"
                >
                  View transaction on explorer
                </a>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center text-white">
              <h2 className="text-2xl text-slate-100 text-center font-semibold my-6">
                Mint a token
              </h2>
              <div className="flex flex-col w-full my-3 px-8">
                <div className="flex-row flex w-full flex gap-2 items-center">
                  <label htmlFor="contractAddress" className="block">
                    Contract address
                  </label>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircleIcon className="w-4 h-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        This is the contract address from which you will mine
                        your tokens. You can not edit this field.{' '}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="relative w-full text-zinc-400">
                  <input
                    type="text"
                    name="contractAddress"
                    id="contractAddress"
                    disabled={true}
                    value={formatAddress(address)}
                    className="mt-2 w-full px-3 py-2 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--card))] cursor-not-allowed"
                  />
                  <div className="absolute right-4 top-2 inset-y-0 flex items-center font-semibold">
                    <Tooltip>
                      <TooltipTrigger>
                        {contractAddressCopied ? (
                          <CheckCircleIcon
                            onClick={() => {
                              copyToClipboard(address!)
                            }}
                            className="w-5 h-5 text-green-500"
                          ></CheckCircleIcon>
                        ) : (
                          <CopyIcon
                            onClick={() => {
                              copyToClipboard(address!)
                              setContractAddressCopied(true)
                            }}
                            className="w-5 h-5 hover:text-custom-pink cursor-pointer"
                          />
                        )}
                      </TooltipTrigger>
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full my-3 px-8">
                <div className="flex-row flex w-full flex gap-2 items-center">
                  <label htmlFor="addressTo" className="block">
                    Address to
                  </label>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircleIcon className="w-4 h-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Enter the address where you want to send your tokens
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <input
                  type="text"
                  name="addressTo"
                  id="addressTo"
                  value={formData.addressTo}
                  onChange={handleChange}
                  className="mt-2 w-full px-3 py-2 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--card))] focus:border-gray-200 focus:outline-none"
                />
              </div>
              {strategy === DEPLOY_STRATEGY_ENUM.ERC1155 && (
                <div className="flex flex-col w-full my-3 px-8">
                  <div className="flex-row flex w-full flex gap-2 items-center">
                    <label htmlFor="tokenId" className="block">
                      ERC1155 Token ID
                    </label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircleIcon className="w-4 h-4" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Enter the token ID from which you want to mint</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <input
                    type="text"
                    name="tokenId"
                    id="tokenId"
                    value={formData.tokenId}
                    onChange={handleChange}
                    className="mt-2 w-full px-3 py-2 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--card))] focus:border-gray-200 focus:outline-none"
                  />
                </div>
              )}
              <div className="flex flex-col w-full my-3 px-8">
                <div className="flex-row flex gap-2 items-center">
                  <label htmlFor="amount" className="block">
                    Amount
                  </label>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircleIcon className="w-4 h-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Enter the amount of tokens that you want to send</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <input
                  type="text"
                  name="amount"
                  id="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="mt-2 w-full px-3 py-2 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--card))] focus:border-gray-200 focus:outline-none"
                />
              </div>
              <div className="justify-end w-full flex items-center mt-6 mr-8 mb-4">
                {!isLoggedIn ? (
                  <ConnectWalletButton title="Connect wallet to mint" />
                ) : (
                  <Button
                    className="w-40 bg-white text-2xl text-black before:w-full active:bg-slate-400"
                    type="submit"
                    disabled={!isFormCompleted || !isLoggedIn}
                    variant={'outline'}
                    onClick={handleSubmit}
                  >
                    Mint
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </BaseDialog>
  )
}

export default MintTokenDialog

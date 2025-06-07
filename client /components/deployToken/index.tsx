'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ROUTER } from "@/constants";
import { HelpCircleIcon, InfoCircleIcon } from "@/components/icons";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import { useRouter } from "next/navigation";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/lib/thirdweb";

const DeployToken: React.FC = () => {
    const router = useRouter();

    return (
        <Card className="w-full shadow-lg">
            <CardHeader className="space-y-4">
                <CardTitle className="flex flex-row justify-between items-center text-2xl">
                    <div className="font-bold">Deploy Token</div>
                    <div 
                        className="cursor-pointer flex flex-row text-custom-green text-lg items-center gap-1 hover:opacity-80 transition-opacity" 
                        onClick={() => { router.push(ROUTER.MY_TOKENS) }}
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Go back to my tokens
                    </div>
                </CardTitle>
                <CardDescription className="text-lg">Deploy your meme token on Rootstock!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <div className="flex-row flex gap-2 items-center">
                            <label htmlFor="name" className="block font-medium">
                                Name
                            </label>
                            <Tooltip>
                                <TooltipTrigger>
                                    <HelpCircleIcon className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Enter the name of the ERC20 token.</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Enter token name"
                            className="mt-2 w-full px-4 py-3 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))] focus:border-custom-green focus:ring-1 focus:ring-custom-green focus:outline-none transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex-row flex gap-2 items-center">
                            <label htmlFor="symbol" className="block font-medium">
                                Symbol
                            </label>
                            <Tooltip>
                                <TooltipTrigger>
                                    <HelpCircleIcon className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Enter the symbol of the ERC20 token.</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                        <input
                            type="text"
                            name="symbol"
                            id="symbol"
                            placeholder="Enter token symbol"
                            className="mt-2 w-full px-4 py-3 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))] focus:border-custom-green focus:ring-1 focus:ring-custom-green focus:outline-none transition-all"
                        />
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="flex-row flex gap-2 items-center">
                        <span className="font-medium">Token Logo</span>
                        <Tooltip>
                            <TooltipTrigger>
                                <HelpCircleIcon className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Select a PNG or JPG image for the ERC20 token.</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center gap-4 border-2 border-dashed border-[hsl(var(--border))] rounded-xl hover:border-custom-green transition-colors p-8">
                        <div className="flex flex-col items-center gap-2 text-center">
                            <InfoCircleIcon className="w-12 h-12 text-gray-400" />
                            <div className="text-gray-600">
                                <span className="font-medium text-gray-900">Click to upload</span> or drag and drop
                            </div>
                            <div className="text-sm text-gray-500">PNG, JPG up to 10MB</div>
                        </div>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            accept="image/png, image/jpeg"
                            className="hidden"
                        />
                        <label
                            htmlFor="image"
                            className="px-6 py-2.5 flex items-center justify-center rounded-lg font-medium bg-custom-cyan text-black cursor-pointer hover:opacity-90 transition-all shadow-sm hover:shadow-md"
                        >
                            Select a file
                        </label>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="px-8 py-6 relative justify-end border-t border-[hsl(var(--border))]">
                <div className="flex flex-row gap-4 items-center">
                    <span className="text-gray-600">Connect your wallet to deploy your token</span>
                    <ConnectButton client={client} />
                </div>
            </CardFooter>
        </Card>
    )
}

export default DeployToken;
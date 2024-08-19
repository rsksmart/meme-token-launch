'use client'

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import HelpCircle from "@/components/icons/HelpCircle";
import DeployERC20TokenButton from "@/components/ui/deployERC20TokenButton";

const STRATEGY = {
    INFLATIONARY: {
        name: "Inflationary",
        value: "inflationary"
    },
    DEFLATIONARY : {
        name: "Deflationary",
        value: "deflationary"
    }
}
const DeployToken: React.FC = () => {

    const [formData, setFormData] = useState({
        name: "",
        symbol: "",
        description: "",
        strategy: "deflationary",
    });

    const handleChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Deploy</CardTitle>
                <CardDescription>Deploy your meme token on Rootstock!</CardDescription>
            </CardHeader>
            <CardContent>
                <div>
                    <div className="my-6">
                        <div className="flex-row flex gap-2 items-center">
                            <label htmlFor="address" className="block">
                                Strategy
                            </label>
                            <Tooltip>
                                <TooltipTrigger>
                                    <HelpCircle className="w-4 h-4" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Select the strategy to deploy the ERC20 tokens.</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                        <select
                            name="strategy"
                            id="strategy"
                            value={formData.strategy}
                            onChange={handleChange}
                            className="mt-2 w-full px-3 py-2 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--card))] focus:border-gray-200 focus:outline-none"
                        >
                            <option value={STRATEGY.DEFLATIONARY.value}>{STRATEGY.DEFLATIONARY.name}</option>
                            <option value={STRATEGY.INFLATIONARY.value}>{STRATEGY.INFLATIONARY.name}</option>
                        </select>

                    </div>
                    <div className="my-6">
                        <div className="flex-row flex gap-2 items-center">
                            <label htmlFor="address" className="block">
                                Name
                            </label>
                            <Tooltip>
                                <TooltipTrigger>
                                    <HelpCircle className="w-4 h-4" />
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
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-2 w-full px-3 py-2 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--card))] focus:border-gray-200 focus:outline-none"
                        />
                    </div>
                    <div className="my-6">
                        <div className="flex-row flex gap-2 items-center">
                            <label htmlFor="token_id" className="block">
                                Symbol
                            </label>
                            <Tooltip>
                                <TooltipTrigger>
                                    <HelpCircle className="w-4 h-4" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>
                                        Enter the symbol of the ERC20 token
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </div>

                        <input
                            type="text"
                            name="symbol"
                            id="symbol"
                            value={formData.symbol}
                            onChange={handleChange}
                            className="mt-2 w-full px-3 py-2 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--card))] focus:border-gray-200 focus:outline-none"
                        />
                    </div>
                    <div className="mt-6">
                        <div className="flex-row flex gap-2 items-center">
                            <label htmlFor="price" className="">
                                Description
                            </label>
                            <Tooltip>
                                <TooltipTrigger>
                                    <HelpCircle className="w-4 h-4" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Enter a description for the ERC20 token.</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>

                        <input
                            type="text"
                            name="description"
                            id="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="mt-2 w-full px-3 py-2 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--card))] focus:border-gray-200 focus:outline-none"
                        />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="px-0 relative z-0 justify-end mb-6 mr-6">
                <DeployERC20TokenButton params={formData} />
            </CardFooter>
        </Card>
    )
}

export default DeployToken;
'use client'

import { ChangeEvent, useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import DeployERC20TokenButton from "@/components/ui/deployERC20TokenButton";
import { DEPLOY_STRATEGY, DEPLOY_STRATEGY_ENUM, ROUTER } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import ConnectWalletButton from "@/components/ui/connectWalletButton";
import { HelpCircleIcon } from "@/components/icons";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import { useRouter } from "next/navigation";

export type DeployFormData = {
    name: string;
    symbol: string;
    initialSupply: string;
    maxSupply: string;
    strategy: DEPLOY_STRATEGY_ENUM;
    image: File | null;
};

const DeployToken: React.FC = () => {
    const { isLoggedIn } = useAuth();
    const [gasless, setGasless] = useState(true);

    const [formData, setFormData] = useState<DeployFormData>({
        name: "",
        symbol: "",
        initialSupply: "",
        maxSupply: "",
        strategy: DEPLOY_STRATEGY_ENUM.DEFLATIONARY,
        image: null as File | null,
    });

    const router = useRouter();

    const [isFormCompleted, setIsFormCompleted] = useState(false)

    const hasEmptyField = () => {
        return Object.entries(formData).some(([key, value]) => {
            if (key === "maxSupply" && formData.strategy === DEPLOY_STRATEGY_ENUM.INFLATIONARY) {
                return false;
            }
            if (key === "image") {
                return !value;
            }
            return value === "";
        });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, files } = e.target as HTMLInputElement;

        if (name === "image" && files && files.length > 0) {
            const file = files[0];
            if (file.type === "image/png" || file.type === "image/jpeg") {
                setFormData((prevData) => ({
                    ...prevData,
                    image: file,
                }));
            } else {
                alert("Please select a PNG or JPG image.");
            }
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    useEffect(() => {
        setIsFormCompleted(!hasEmptyField())
    }, [formData])

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex flex-row justify-between items-center">
                    <div>Deploy</div>
                    <div className="cursor-pointer flex flex-row text-custom-green text-lg items-center gap-1" onClick={() => { router.push(ROUTER.MY_TOKENS) }}>
                        <ArrowLeftIcon className="w-4 h-4" />
                        Go back to my tokens
                    </div>
                </CardTitle>
                <CardDescription>Deploy your meme token on Rootstock!</CardDescription>
            </CardHeader>
            <CardContent className={!isLoggedIn ? "opacity-40" : ""}>
                <div className="flex flex-row gap-10 w-full">
                    <div className="w-full">
                        <div className="flex-row flex gap-2 items-center">
                            <label htmlFor="strategy" className="block">
                                Strategy
                            </label>
                            <Tooltip>
                                <TooltipTrigger>
                                    <HelpCircleIcon className="w-4 h-4" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Select the strategy to deploy the ERC20 tokens.</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                        <select
                            name="strategy"
                            id="strategy"
                            disabled={!isLoggedIn}
                            value={formData.strategy}
                            onChange={handleChange}
                            className="mt-2 w-full px-3 py-2 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--card))] focus:border-gray-200 focus:outline-none"
                        >
                            <option value={DEPLOY_STRATEGY_ENUM.DEFLATIONARY}>{DEPLOY_STRATEGY.DEFLATIONARY.name}</option>
                            <option value={DEPLOY_STRATEGY_ENUM.INFLATIONARY}>{DEPLOY_STRATEGY.INFLATIONARY.name}</option>
                        </select>

                    </div>
                    <div className="w-full">
                        <div className="flex-row flex gap-2 items-center">
                            <label htmlFor="gasless">Gasless</label>
                            <Tooltip>
                                <TooltipTrigger>
                                    <HelpCircleIcon className="w-4 h-4" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Active this option if you don't have enough rBTC.</p>
                                </TooltipContent>
                            </Tooltip>

                        </div>
                        <label className={(!isLoggedIn ? "cursor-default " : "") + "flex relative items-center cursor-pointer mt-2"}>
                            <input
                                checked={gasless}
                                name="gasless"
                                type="checkbox"
                                className="sr-only"
                                disabled={!isLoggedIn}
                                onChange={(e) => setGasless(Boolean(e.target.checked))}
                            />
                            <span className={(!isLoggedIn ? "cursor-default " : "") + "w-11 h-6 bg-card rounded-full border border-input toggle-bg"}></span>
                        </label>
                    </div>

                </div>
                <div className="my-4 flex flex-row gap-10">
                    <div className="w-full">
                        <div className="flex-row flex gap-2 items-center">
                            <label htmlFor="name" className="block">
                                Name
                            </label>
                            <Tooltip>
                                <TooltipTrigger>
                                    <HelpCircleIcon className="w-4 h-4" />
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
                            disabled={!isLoggedIn}
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-2 w-full px-3 py-2 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--card))] focus:border-gray-200 focus:outline-none"
                        />
                    </div>
                    <div className="w-full">
                        <div className="flex-row flex gap-2 items-center">
                            <label htmlFor="symbol" className="block">
                                Symbol
                            </label>
                            <Tooltip>
                                <TooltipTrigger>
                                    <HelpCircleIcon className="w-4 h-4" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>
                                        Enter the symbol of the ERC20 token.
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </div>

                        <input
                            type="text"
                            name="symbol"
                            id="symbol"
                            disabled={!isLoggedIn}
                            value={formData.symbol}
                            onChange={handleChange}
                            className="mt-2 w-full px-3 py-2 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--card))] focus:border-gray-200 focus:outline-none"
                        />
                    </div>
                </div>
                <div className="w-full mt-4 flex flex-row gap-10">
                    <div className="w-full">
                        <div className="flex-row flex gap-2 items-center">
                            <label htmlFor="initialSupply" className="">
                                Initial Supply
                            </label>
                            <Tooltip>
                                <TooltipTrigger>
                                    <HelpCircleIcon className="w-4 h-4" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Enter the Initial Supply for the ERC20 token. It should be in decimal string. </p>
                                </TooltipContent>
                            </Tooltip>
                        </div>

                        <input
                            type="text"
                            name="initialSupply"
                            id="initialSupply"
                            disabled={!isLoggedIn}
                            value={formData.initialSupply}
                            onChange={handleChange}
                            className="mt-2 w-full px-3 py-2 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--card))] focus:border-gray-200 focus:outline-none"
                        />
                    </div>
                    {formData.strategy == DEPLOY_STRATEGY_ENUM.DEFLATIONARY && (
                        <div className="w-full">
                            <div className="flex-row flex gap-2 items-center">
                                <label htmlFor="maxSupply" className="">
                                    Max Supply
                                </label>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <HelpCircleIcon className="w-4 h-4" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Enter the Max Supply for the ERC20 token. It should be in decimal string.</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>

                            <input
                                type="text"
                                name="maxSupply"
                                id="maxSupply"
                                disabled={!isLoggedIn}
                                value={formData.maxSupply}
                                onChange={handleChange}
                                className="mt-2 w-full px-3 py-2 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--card))] focus:border-gray-200 focus:outline-none"
                            />
                        </div>
                    )}
                </div>
                <div className="mt-4">
                    <div className="flex-row flex gap-2 items-center mb-2">
                        Memetoken logo
                        <Tooltip>
                            <TooltipTrigger>
                                <HelpCircleIcon className="w-4 h-4" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Select a PNG or JPG image for the ERC20 token.</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <div className="w-full flex flex-col pt-6 pb-4 justify-center items-center gap-6  border border-[hsl(var(--border))] rounded-md">
                        <div className="h-[200px] w-[200px]">
                            {formData.image ? (
                                <img
                                    src={URL.createObjectURL(formData.image)}
                                    alt="Selected preview"
                                    className="w-full h-full rounded-md"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center">
                                    <span className="text-2xl">N/A</span>
                                </div>
                            )}

                        </div>
                        <label
                            htmlFor="image"
                            className={"w-[190px] py-2 flex items-center justify-center rounded-full font-bold bg-custom-cyan text-black " + (!isLoggedIn ? "cursor-default" : " cursor-pointer hover:opacity-70 transition")}
                        >
                            {formData.image ? formData.image.name : 'Select a file...'}
                        </label>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            disabled={!isLoggedIn}
                            accept="image/png, image/jpeg"
                            onChange={handleChange}
                            className="hidden"
                        />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="px-8 relative justify-end mb-6">
                {isLoggedIn ? (
                    <DeployERC20TokenButton disabled={!isFormCompleted} params={formData} gasless={gasless} />
                ) : (

                    <ConnectWalletButton title="Connect wallet to deploy" />
                )
                }
            </CardFooter>
        </Card>
    )
}

export default DeployToken;
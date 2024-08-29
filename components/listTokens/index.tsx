'use client'

import { useState } from "react";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip"
import { useAuth } from "@/context/AuthContext";
import { CheckCircleIcon, CopyIcon, } from "@/components/icons";
import { copyToClipboard, formatAddress } from "@/lib/utils";
import MintTokenButton from "../ui/mintTokenButton";
import { DEPLOY_STRATEGY_ENUM } from "@/constants";

interface Token {
    name: string
    symbol: string
    address: string
    strategy: DEPLOY_STRATEGY_ENUM
}

const ListTokens: React.FC = () => {
    const { isLoggedIn, env } = useAuth();

    const [copiedAddresses, setCopiedAddresses] = useState<Record<string, boolean>>({});

    const handleCopyToClipboard = (address: string) => {
        copyToClipboard(address).then(() => {
          setCopiedAddresses((prevState) => ({
            ...prevState,
            [address]: true,
          }));
    
          setTimeout(() => {
            setCopiedAddresses((prevState) => ({
              ...prevState,
              [address]: false,
            }));
          }, 1000); 
        });
      };

    const tokens: Token[] = [
        { name: "Token One", symbol: "TK1", address: "0xfa4DD4F1c077C1979640474B874408D4FEee508a", strategy: DEPLOY_STRATEGY_ENUM.DEFLATIONARY },
        { name: "Token Two", symbol: "TK2", address: "0x303Fe7E52012DBF5970cDa98551A3a328146C3e0", strategy: DEPLOY_STRATEGY_ENUM.INFLATIONARY },
    ];

    return (
        <table className="min-w-full bg-background border-b border-border rounded-lg shadow-md">
            <thead className="bg-border">
                <tr>
                    <th className="py-3 px-4 text-left font-semibold">Name</th>
                    <th className="py-3 px-4 text-center font-semibold">Symbol</th>
                    <th className="py-3 px-4 text-center font-semibold">Address</th>
                    <th className="py-3 px-4 text-center font-semibold">Strategy</th>
                    <th className="py-3 px-4 text-center font-semibold">Action</th>
                </tr>
            </thead>
            <tbody>
                {tokens.map((token, index) => (
                    <tr key={index} className="border-b hover:bg-card hover:text-custom-pink transition-colors">
                        <td className="py-3 px-4">{token.name}</td>
                        <td className="py-3 px-4 text-center">{token.symbol}</td>
                        <td className="py-3 px-4 my-3 flex justify-center items-center gap-3">
                            <a
                                href={env.EXPLORER_ADDRESS_BASE_URL + token.address}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold"
                            >
                                {formatAddress(token.address!)}
                            </a>
                            <Tooltip >
                                <TooltipTrigger>
                                    {copiedAddresses[token.address] ? (
                                        <CheckCircleIcon
                                            onClick={() => {
                                                handleCopyToClipboard(token.address!);
                                            }}
                                            className="w-5 h-5 text-green-500"
                                        ></CheckCircleIcon>
                                    ) : (
                                        <CopyIcon
                                            onClick={() => {
                                                handleCopyToClipboard(token.address)
                                            }}
                                            className="w-5 h-5 hover:text-white cursor-pointer"
                                        />
                                    )}
                                </TooltipTrigger>
                            </Tooltip>
                        </td>
                        <td className=" text-center">
                            <div className={(token.strategy == DEPLOY_STRATEGY_ENUM.DEFLATIONARY ? "bg-custom-cyan" : "bg-custom-orange") + " font-bold text-background py-1 rounded-full"}>
                                {token.strategy}
                            </div>
                        </td>
                        <td className="py-3 px-4 items-center text-center">
                            <MintTokenButton disabled={!isLoggedIn} address={token.address} strategy={token.strategy} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ListTokens;
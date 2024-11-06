'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip"
import { useAuth } from "@/context/AuthContext";
import { CheckCircleIcon, CopyIcon, } from "@/components/icons";
import { copyToClipboard, formatAddress } from "@/lib/utils";
import MintTokenButton from "../ui/mintTokenButton";
import { DEPLOY_STRATEGY_ENUM } from "@/constants";
import useConnectWallet from "@/hooks/useConnectWallet";


const ListTokens: React.FC = () => {
    const { isLoggedIn, env, tokens, signer, address } = useAuth();
    const { populateTokensListFromOwner } = useConnectWallet();

    const [copiedAddresses, setCopiedAddresses] = useState<Record<string, boolean>>({});

    useEffect(() => {
        if (isLoggedIn) {
            populateTokensListFromOwner(signer!, address)
        }
    }, []);


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
    return (
        <>
            {tokens.length === 0 ? (
                <div className="text-2xl w-full flex justify-center items-center p-20 m-auto">
                    {!isLoggedIn ? "You should connect your wallet if you want to see something here..." : "It seems like you've not deployed anything yet..."}
                </div>
            ) : (
                <table className="min-w-full bg-background border-b border-border rounded-lg shadow-md">
                    <thead className="bg-border">
                        <tr>
                            <th className="py-3 px-4 text-left font-semibold">Logo</th>
                            <th className="py-3 px-4 text-left font-semibold">Name</th>
                            <th className="py-3 px-4 text-center font-semibold">Symbol</th>
                            <th className="py-3 px-4 text-center font-semibold">Address</th>
                            <th className="py-3 px-4 text-center font-semibold">Current supply</th>
                            <th className="py-3 px-4 text-center font-semibold">Strategy</th>
                            <th className="py-3 px-4 text-center font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tokens.map((token, index) => (
                            <tr key={index} className="border-b hover:bg-card hover:text-custom-pink transition-colors">
                                <td className="py-3 px-4">
                                    {token.uri ? (
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_PINATA_URL}${token.uri}`}
                                            alt={`${token.name} logo`}
                                            className="w-12 h-12 object-cover rounded-full"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                            <span className="text-sm">N/A</span>
                                        </div>
                                    )}
                                </td>

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
                                <td className="py-3 px-4 text-center">{token.currentSupply}</td>
                                <td className=" text-center">
                                    <div className={(token.strategy == DEPLOY_STRATEGY_ENUM.DEFLATIONARY ? "bg-custom-cyan" : "bg-custom-orange") + " font-bold text-background py-1 rounded-full"}>
                                        {`${token.strategy !== DEPLOY_STRATEGY_ENUM.ERC1155 ? 'erc20 ' : ''}${token.strategy}`}
                                    </div>
                                </td>
                                <td className="py-3 px-4 items-center text-center">
                                    <MintTokenButton disabled={!isLoggedIn} address={token.address} strategy={token.strategy} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
}

export default ListTokens;
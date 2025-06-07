'use client'

import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip"
import {  CopyIcon } from "@/components/icons";
import { formatAddress } from "@/lib/utils";
import Image from "next/image";


const ListTokens: React.FC = () => {
    // Placeholder data for UI demonstration
    const isLoggedIn = true;
    const tokens = [
        {
            name: "Sample Token",
            symbol: "STK",
            address: "0x1234567890123456789012345678901234567890",
            currentSupply: "1,000,000",
            uri: null
        }
    ];

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
                                      // eventully migrated to media render component from thirdweb 
                                      <Image
                                            src={token.uri ? `${process.env.NEXT_PUBLIC_PINATA_URL || 'https://ipfs.io/ipfs/'}${token.uri}` : '/placeholder-token.png'}
                                            alt={`${token.name} logo`}
                                            width={48}
                                            height={48}
                                            className="object-cover rounded-full"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = '/placeholder-token.png';
                                            }}
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
                                        href={"#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-semibold"
                                    >
                                        {formatAddress(token.address)}
                                    </a>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <CopyIcon
                                                className="w-5 h-5 hover:text-white cursor-pointer"
                                            />
                                        </TooltipTrigger>
                                    </Tooltip>
                                </td>
                                <td className="py-3 px-4 text-center">{token.currentSupply}</td>
                              
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
}

export default ListTokens;
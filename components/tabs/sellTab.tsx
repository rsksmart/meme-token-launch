"use client";

import {
  useContract,
  useCreateDirectListing,
  Web3Button,
} from "@thirdweb-dev/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleHelp } from "lucide-react";
import { useState } from "react";
import { Config } from "@/app/config";
import { connectWalletProps } from "@/constants";
import { Tab } from ".";


export default function SellTab({setActiveTab}: any ) {
  const contractAddress = Config.marketplaceContractAddress;
  const { contract } = useContract(contractAddress, "marketplace-v3");

  const { mutateAsync: createDirectListing } = useCreateDirectListing(contract);
  
  const [formData, setFormData] = useState({
    token_id: "",
    address: "",
    price: "",
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
        <CardTitle>Sell</CardTitle>
        <CardDescription>Upload your Rune to the marketplace!</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div className="my-6">
            <div className="flex-row flex gap-2 items-center">
              <label htmlFor="address" className="block">
                Rune Contract Address
              </label>
              <Tooltip>
                <TooltipTrigger>
                  <CircleHelp className="w-4 h-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Enter the address the Rune contract address.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <input
              type="text"
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-2 w-full px-3 py-2 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--card))] focus:border-gray-200 focus:outline-none"
            />
          </div>
          <div className="my-6">
            <div className="flex-row flex gap-2 items-center">
              <label htmlFor="token_id" className="block">
                Token ID
              </label>
              <Tooltip>
                <TooltipTrigger>
                  <CircleHelp className="w-4 h-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Enter the token ID of the Rune in the address specified.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>

            <input
              type="text"
              name="token_id"
              id="token_id"
              value={formData.token_id}
              onChange={handleChange}
              className="mt-2 w-full px-3 py-2 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--card))] focus:border-gray-200 focus:outline-none"
            />
          </div>
          <div className="my-6">
            <div className="flex-row flex gap-2 items-center">
              <label htmlFor="price" className="">
                Sale Price
              </label>
              <Tooltip>
                <TooltipTrigger>
                  <CircleHelp className="w-4 h-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Enter the sale price to sell your Rune.</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <input
              type="text"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-2 w-full px-3 py-2 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--card))] focus:border-gray-200 focus:outline-none"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-0 relative z-0 justify-end mb-4 mr-4">
        <Web3Button
          {...connectWalletProps}
          contractAddress={contractAddress}
          action={async () =>
            await createDirectListing({
              assetContractAddress: formData.address,
              tokenId: formData.token_id,
              pricePerToken: formData.price,
              currencyContractAddress: NATIVE_TOKEN_ADDRESS,
              quantity: 1,
              startTimestamp: new Date(),
              endTimestamp: new Date(
                new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
              ),
            }).finally( () => 
                setActiveTab(Tab.BUY)
            )
          }
        >
          List
        </Web3Button>
      </CardFooter>
    </Card>
  );
}

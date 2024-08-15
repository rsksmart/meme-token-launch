"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MediaRenderer,
  Status,
  useContract,
  useDirectListings,
} from "@thirdweb-dev/react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Image, CircleHelp } from "lucide-react";
import { useRouter } from "next/navigation";
import { Config } from "@/app/config";

export default function BuyTab() {
  const { contract } = useContract(
    Config.marketplaceContractAddress,
    "marketplace-v3",
  );
  const { data: listings, isLoading: loadingListings } =
    useDirectListings(contract);

  const router = useRouter();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Buy</CardTitle>
        <CardDescription>Buy a Rune!</CardDescription>
      </CardHeader>
      <CardContent>
        {loadingListings ? (
          <div>
            <div className="animate-pulse grid w-full md:grid-cols-5 xl:grid-cols-8 sm:grid-cols-2 gap-4 mt-3">
              {[...Array(10)].map((e, i) => (
                <div key={i}>
                  <div className="max-w-200 max-h-200">
                    <div className="w-[200px] h-[200px] my-2 bg-border rounded-lg items-center justify-center flex">
                      <Image className="w-14 h-14 text-gray-200"></Image>
                    </div>
                  </div>
                  <div className="">
                    <div className="h-[10px] my-2 bg-border rounded-lg  max-w-[150px]"></div>
                    <div className="h-[10px] my-2 bg-border rounded-lg  max-w-[80px]"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid w-full md:grid-cols-5 xl:grid-cols-8 sm:grid-cols-2 gap-4  mt-5">
            {listings
              ?.filter((listing) => listing.status === Status.Active)
              .map((listing) => (
                <div
                  key={listing.id}
                  className="hover:text-purple-400 hover:text-bold px-4"
                  onClick={() => router.push(`/listings/${listing.id}`)}
                >
                  <div className="w-max-[200px] max-h-[200px]">
                    <Link
                      className="w-[200px]"
                      href={`/listings/${listing.id}`}
                    >
                      {listing.asset.image ? (
                        <div className="w-[200px] h-[200px] rounded-lg my-2">
                          <MediaRenderer
                            className="rounded-lg"
                            width="200px"
                            height="200px"
                            src={listing.asset.image}
                          />
                        </div>
                      ) : (
                        // <img className='rounded-lg mb-2' src={listing.asset.image}></img>
                        <div className="w-[200px] h-[200px] my-2 bg-border rounded-lg items-center justify-center flex">
                          <Image className="w-14 h-14 text-gray-200"></Image>
                        </div>
                      )}
                    </Link>
                  </div>
                  <div className="flex flex-col items-start">
                    <Link
                      className="bold tracking-wide"
                      href={`/listing/${listing.id}`}
                    >
                      {listing.asset.name}
                    </Link>
                    <div className="flex flex-row items-center">
                      <p>
                        {listing.currencyValuePerToken.displayValue}{" "}
                        {listing.currencyValuePerToken.symbol}
                      </p>
                      <Tooltip>
                        <TooltipTrigger>
                          <CircleHelp className="w-6 h-6 pl-2" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-[200px]">
                            Gas costs are not included
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

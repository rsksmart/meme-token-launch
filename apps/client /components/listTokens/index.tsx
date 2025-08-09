'use client';

import { useEffect, useState, useCallback } from "react";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { CopyIcon } from "@/components/icons";
import { formatAddress } from "@/lib/utils";
import { useActiveAccount } from "thirdweb/react";
import toast from "react-hot-toast";

interface ContractMetadata {
  name: string;
  symbol: string;
  description: string;
}

interface DeployedContract {
  address: string;
  tokenType: "ERC20" | "ERC721";
  metadata: ContractMetadata;
}

interface ApiResponse {
  totalContracts: number;
  erc721Count: number;
  erc20Count: number;
  contracts: DeployedContract[];
}

const ListTokens: React.FC = () => {
  const [contracts, setContracts] = useState<DeployedContract[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const accountAddress = useActiveAccount()?.address;

  const fetchContracts = useCallback(async () => {
    if (!accountAddress) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`http://localhost:4000/v1/deploys/${accountAddress}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ApiResponse = await response.json();
      setContracts(data.contracts || []);
    } catch (error) {
      console.error('Failed to fetch contracts:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch contracts');
      setContracts([]);
    } finally {
      setLoading(false);
    }
  }, [accountAddress]);

  useEffect(() => {
    if (accountAddress) {
      fetchContracts();
    } else {
      setContracts([]);
      setError(null);
    }
  }, [accountAddress, fetchContracts]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Address copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy address');
    }
  };

  const getExplorerUrl = (address: string) => {
    // Update this URL to match your network's explorer
    return `https://explorer.testnet.rsk.co/address/${address}`;
  };

  if (!accountAddress) {
    return (
      <div className="text-lg sm:text-xl lg:text-2xl w-full flex justify-center items-center p-8 sm:p-12 lg:p-20 m-auto text-center">
        You should connect your wallet if you want to see something here...
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-lg sm:text-xl lg:text-2xl w-full flex justify-center items-center p-8 sm:p-12 lg:p-20 m-auto">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center">
          <span>Loading your tokens...</span>
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 sm:p-12 lg:p-20">
        <div className="text-red-500 text-lg sm:text-xl mb-4">Error loading tokens</div>
        <div className="text-gray-500 mb-6 text-sm sm:text-base">{error}</div>
        <button
          onClick={fetchContracts}
          className="px-4 sm:px-6 py-2 text-sm sm:text-base bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (contracts.length === 0) {
    return (
      <div className="text-lg sm:text-xl lg:text-2xl w-full flex justify-center items-center p-8 sm:p-12 lg:p-20 m-auto text-center">
        It seems like you&apos;ve not deployed anything yet...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-xs sm:text-sm text-gray-400 mb-4">
        Found {contracts.length} deployed contract{contracts.length !== 1 ? 's' : ''}
      </div>
      
      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <table className="min-w-full bg-background border-b border-border rounded-lg shadow-md">
          <thead className="bg-border">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">Type</th>
              <th className="py-3 px-4 text-left font-semibold">Name</th>
              <th className="py-3 px-4 text-center font-semibold">Symbol</th>
              <th className="py-3 px-4 text-left font-semibold">Description</th>
              <th className="py-3 px-4 text-center font-semibold">Address</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((contract, index) => (
              <tr
                key={index}
                className="border-b hover:bg-card hover:text-custom-pink transition-colors"
              >
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    contract.tokenType === 'ERC20' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {contract.tokenType}
                  </span>
                </td>

                <td className="py-3 px-4 font-medium">{contract.metadata.name}</td>
                
                <td className="py-3 px-4 text-center font-mono text-sm">
                  {contract.metadata.symbol}
                </td>
                
                <td className="py-3 px-4 text-sm max-w-xs truncate">
                  {contract.metadata.description || 'No description'}
                </td>
                
                <td className="py-3 px-4">
                  <div className="flex justify-center items-center gap-3">
                    <a
                      href={getExplorerUrl(contract.address)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm hover:text-orange-500 transition-colors"
                    >
                      {formatAddress(contract.address)}
                    </a>
                    <Tooltip>
                      <TooltipTrigger>
                        <CopyIcon 
                          className="w-5 h-5 hover:text-orange-500 cursor-pointer transition-colors" 
                          onClick={() => copyToClipboard(contract.address)}
                        />
                      </TooltipTrigger>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {contracts.map((contract, index) => (
          <div
            key={index}
            className="bg-background border border-border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
          >
            {/* Header with Type and Name */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base sm:text-lg truncate">{contract.metadata.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    contract.tokenType === 'ERC20' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {contract.tokenType}
                  </span>
                  <span className="font-mono text-sm text-gray-600">
                    {contract.metadata.symbol}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            {contract.metadata.description && (
              <div className="mb-3">
                <p className="text-sm text-gray-600 line-clamp-2">
                  {contract.metadata.description}
                </p>
              </div>
            )}

            {/* Address Section */}
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 mb-1">Contract Address</p>
                <a
                  href={getExplorerUrl(contract.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm hover:text-orange-500 transition-colors break-all"
                >
                  {contract.address}
                </a>
              </div>
              <Tooltip>
                <TooltipTrigger>
                  <CopyIcon 
                    className="w-5 h-5 hover:text-orange-500 cursor-pointer transition-colors ml-2 flex-shrink-0" 
                    onClick={() => copyToClipboard(contract.address)}
                  />
                </TooltipTrigger>
              </Tooltip>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListTokens;
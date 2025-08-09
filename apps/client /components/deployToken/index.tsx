'use client';

import { useEffect, useState } from "react";
import {
  Card, CardContent, CardDescription, CardFooter,
  CardHeader, CardTitle
} from "@/components/ui/card";
import {
  Tooltip, TooltipContent, TooltipTrigger
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ROUTER } from "@/constants";
import { HelpCircleIcon, InfoCircleIcon } from "@/components/icons";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import { useRouter } from "next/navigation";
import { upload } from "thirdweb/storage";
import { client } from "@/lib/thirdweb/client";
import Image from "next/image";
import { useActiveAccount } from "thirdweb/react";
import toast from "react-hot-toast";

const DeployToken: React.FC = () => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedImageUri, setUploadedImageUri] = useState<string | null>(null);
  const [deploying, setDeploying] = useState(false);
  const accountAddress = useActiveAccount()?.address;

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    description: '',
    tokenType: 'ERC20'
  });

  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl); // Clean up
    } else {
      setPreviewUrl(null);
    }
  }, [selectedFile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadTest = async () => {
    if (!selectedFile) return;
    setUploading(true);

    try {
      const uri = await upload({ client, files: [selectedFile] });
      setUploadedImageUri(uri);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDeploy = async () => {
    if (!isDeployEnabled || !accountAddress) return;
    
    setDeploying(true);
    
    try {
      // Determine API endpoint based on token type
      const endpoint = formData.tokenType === 'ERC20' 
        ? 'http://localhost:4000/v1/deploy/erc20'
        : 'http://localhost:4000/v1/deploy/erc721';
      
      // Prepare deployment data
      const deployData = {
        name: formData.name,
        symbol: formData.symbol,
        description: formData.description,
        defaultAdmin: accountAddress, 
        image: uploadedImageUri
      };
      
      console.log('Deploying to:', endpoint);
      console.log('Deploy Data:', deployData);
      
      // Make API call
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deployData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Deployment successful:', result);
      
      // Show success toast with deployed address
      const deployedAddress = result.contractAddress || result.address || 'Address not found';
      toast.custom((t) => (
        <div
          className={`max-w-md bg-white border border-gray-200 rounded-lg shadow-md p-4 ${
            t.visible ? 'animate-enter' : 'animate-leave'
          }`}
        >
          <div className="flex flex-col space-y-2 text-sm text-gray-900">
            <div className="font-semibold">🪙 {formData.name} ({formData.symbol}) deployed!</div>
            <div>
              🔗{' '}
              <a
                href={`https://explorer.testnet.rootstock.io/address/${deployedAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View on Explorer
              </a>
            </div>
          </div>
        </div>
      ));
      
    } catch (error) {
      console.error('Deployment failed:', error);
      toast.error(`Deployment failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setDeploying(false);
    }
  };

  const isDeployEnabled = formData.name && formData.symbol && uploadedImageUri && accountAddress;

  return (
    <Card className="w-full max-w-5xl mx-auto shadow-lg">
      <CardHeader className="space-y-4 pb-6">
        <CardTitle className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 text-xl sm:text-2xl">
          <div className="font-bold">Deploy Token</div>
          <div
            className="cursor-pointer flex items-center gap-1 text-orange-500 text-base sm:text-lg hover:opacity-80"
            onClick={() => router.push(ROUTER.MY_TOKENS)}
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Go back to my tokens
          </div>
        </CardTitle>
        <CardDescription className="text-base sm:text-lg">
          Deploy your meme token on Rootstock!
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column - Form Fields */}
          <div className="space-y-4 sm:space-y-6">
            {/* Token Type Selector */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label htmlFor="tokenType" className="block font-medium text-sm sm:text-base">Token Type *</label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircleIcon className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Choose between ERC20 (fungible) or ERC721 (NFT) token standard.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <select
                name="tokenType"
                id="tokenType"
                value={formData.tokenType}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))] focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              >
                <option value="ERC20">ERC20 - Fungible Token</option>
                <option value="ERC721">ERC721 - NFT</option>
              </select>
            </div>

            {/* Token Name */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label htmlFor="name" className="block font-medium text-sm sm:text-base">Name *</label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircleIcon className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Enter the name of the token.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter token name"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))] focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>

            {/* Token Symbol */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label htmlFor="symbol" className="block font-medium text-sm sm:text-base">Symbol *</label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircleIcon className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Enter the symbol of the token.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <input
                type="text"
                name="symbol"
                id="symbol"
                value={formData.symbol}
                onChange={handleInputChange}
                placeholder="Enter token symbol"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))] focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label htmlFor="description" className="block font-medium text-sm sm:text-base">Description</label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircleIcon className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Enter a description for your token (optional).</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your meme token..."
                rows={4}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))] focus:border-orange-500 focus:ring-1 focus:ring-orange-500 resize-vertical sm:rows-6"
              />
            </div>
          </div>

          {/* Right Column - Image Upload */}
          <div className="space-y-4 flex flex-col">
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-semibold">Token Logo *</h3>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircleIcon className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Select a PNG or JPG image for the token.</p>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center flex-1 flex flex-col justify-center min-h-[200px] sm:min-h-[240px]">
              {previewUrl ? (
                <div className="space-y-4">
                  <div className="relative w-40 h-40 sm:w-60 sm:h-60 mx-auto rounded-lg overflow-hidden">
                    <Image
                      src={previewUrl}
                      alt="Selected token logo"
                      fill
                      className="object-cover"
                    />
                    {uploadedImageUri && (
                      <div className="absolute top-1 right-1 bg-green-500 text-white text-xs px-1 py-0.5 rounded">
                        ✓
                      </div>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 break-all">{selectedFile?.name}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <InfoCircleIcon className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto" />
                  <div className="text-sm sm:text-base">
                    <span className="font-medium">Click to upload</span> or drag and drop
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">PNG, JPG up to 10MB</div>
                </div>
              )}

              <input
                type="file"
                name="image"
                id="image"
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={handleFileSelect}
              />
              
              <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-6 justify-center">
                <label
                  htmlFor="image"
                  className="px-4 sm:px-6 py-2 text-sm sm:text-base bg-gray-600 text-white rounded-lg cursor-pointer hover:bg-gray-700 transition-colors min-w-[120px] sm:min-w-[140px] text-center"
                >
                  {previewUrl ? 'Change Image' : 'Select File'}
                </label>
                <Button
                  onClick={handleUploadTest}
                  disabled={!selectedFile}
                  className="px-4 sm:px-6 py-2 text-sm sm:text-base bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 min-w-[120px] sm:min-w-[140px]"
                >
                  {uploading ? 'Uploading...' : 'Upload'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-6">
        <Button
          onClick={handleDeploy}
          disabled={!isDeployEnabled || deploying}
          className="w-full py-3 my-2 text-sm sm:text-base bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 font-semibold"
        >
          {deploying ? (
            <span className="flex items-center justify-center gap-2">
              Deploying
              <span className="flex space-x-2">
                <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
              </span>
            </span>
          ) : (
            'Deploy Token'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DeployToken;
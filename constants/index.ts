import { ethers } from "ethers";

export interface AccountData {
    provider?:  ethers.BrowserProvider; 
    signer?: ethers.Signer;
    address?: string;
    balance?: bigint;
    chainId?: bigint;
    network?: string;
}


export const ROUTER = {
    INDEX: '/',
    DEPLOY_TOKEN: '/deploy-token',
  }
  
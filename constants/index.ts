import { ethers } from "ethers";

export interface AccountData {
    provider?: ethers.BrowserProvider;
    signer?: ethers.Signer;
    address?: string;
    balance?: bigint;
    chainId?: bigint;
    network?: string;
}


export const ROUTER = {
    INDEX: '/',
    DEPLOY_TOKEN: '/deploy-token',
    MY_TOKENS: '/my-tokens',
}
export enum DEPLOY_STRATEGY_ENUM {
    INFLATIONARY = "inflationary",
    DEFLATIONARY = "deflationary"
}

export const DEPLOY_STRATEGY = {
    INFLATIONARY: {
        name: "Inflationary",
        value: DEPLOY_STRATEGY_ENUM.INFLATIONARY
    },
    DEFLATIONARY: {
        name: "Deflationary",
        value: DEPLOY_STRATEGY_ENUM.DEFLATIONARY
    }
}
'use client'
import { ContractInfo, ROUTER, Token } from '@/constants';
import { ethers, Signer } from 'ethers';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useContext, createContext, ReactNode, useCallback, useEffect, Dispatch, SetStateAction } from 'react';

type EnvironmentVariables = {
    FACTORY_ADDRESS: string
    TOKEN_CREATED_EVENT: string
    EXPLORER_TX_BASE_URL: string
    EXPLORER_ADDRESS_BASE_URL: string
}

interface AuthContextType {
    isLoggedIn: boolean;
    provider: ethers.BrowserProvider | undefined;
    address: string;
    signer: Signer | undefined;
    tokens: Token[];
    env: EnvironmentVariables;
    login: (provider: ethers.BrowserProvider) => void;
    logout: () => void;
    setAddress: React.Dispatch<React.SetStateAction<string>>;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    setSigner: Dispatch<SetStateAction<ethers.Signer | undefined>>;
    setTokens: Dispatch<SetStateAction<Token[]>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const FACTORY_ADDRESS = process.env.NEXT_PUBLIC_FACTORY_ADDRESS
    const TOKEN_CREATED_EVENT = process.env.NEXT_PUBLIC_TOKEN_CREATED_EVENT
    const EXPLORER_TX_BASE_URL = process.env.NEXT_PUBLIC_EXPLORER_TX_BASE_URL
    const EXPLORER_ADDRESS_BASE_URL = process.env.NEXT_PUBLIC_EXPLORER_ADDRESS_BASE_URL


    if (!FACTORY_ADDRESS || !TOKEN_CREATED_EVENT || !EXPLORER_TX_BASE_URL || !EXPLORER_ADDRESS_BASE_URL) {
        throw new Error("Environment variables are not complete");
    }

    const env = {
        FACTORY_ADDRESS,
        TOKEN_CREATED_EVENT,
        EXPLORER_TX_BASE_URL,
        EXPLORER_ADDRESS_BASE_URL
    }

    const router = useRouter()
    const pathname = usePathname()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [address, setAddress] = useState<string>('')
    const [signer, setSigner] = useState<Signer | undefined>()
    const [tokens, setTokens] = useState<Token[]>([])
    const [provider, setProvider] = useState<ethers.BrowserProvider | undefined>(
        undefined
    )

    const login = useCallback((provider: ethers.BrowserProvider) => {
        setProvider(provider)
        setIsLoggedIn(true)
    }, [])

    const logout = useCallback(() => {
        setProvider(undefined)
        setIsLoggedIn(false)
        setTokens([])
        setAddress('')
    }, [])

    useEffect(() => {
        if (isLoggedIn && pathname === ROUTER.INDEX) {
            router.push(ROUTER.DEPLOY_TOKEN)
        }
    }, [pathname])

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                provider,
                address,
                signer,
                env,
                tokens,
                login,
                logout,
                setAddress,
                setSigner,
                setIsLoggedIn,
                setTokens
            }
            }
        >
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

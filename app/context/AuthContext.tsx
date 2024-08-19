'use client'
import { ROUTER } from '@/constants';
import { ethers } from 'ethers';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useContext, createContext, ReactNode, useCallback, useEffect } from 'react';
import { createThirdwebClient, ThirdwebClient } from "thirdweb";
import { privateKeyToAccount, Account } from "thirdweb/wallets";

interface AuthContextType {
    isLoggedIn: boolean;
    provider: ethers.BrowserProvider | undefined;
    address: string;
    client: ThirdwebClient;
    account: Account;
    login: (provider: ethers.BrowserProvider) => void;
    logout: () => void;
    setAddress: React.Dispatch<React.SetStateAction<string>>;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {

    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
    const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;

    if (!clientId || !privateKey) {
        throw new Error("Missing environment variables");
    }
    const client = createThirdwebClient({
        clientId
    });

    const account = privateKeyToAccount({ privateKey, client });


    const router = useRouter()
    const pathname = usePathname()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [address, setAddress] = useState<string>('')
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
                client,
                account,
                login,
                logout,
                setAddress,
                setIsLoggedIn
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

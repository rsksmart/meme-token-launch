'use client'
import { ROUTER } from '@/constants';
import { ethers, Signer } from 'ethers';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useContext, createContext, ReactNode, useCallback, useEffect, Dispatch, SetStateAction } from 'react';

interface AuthContextType {
    isLoggedIn: boolean;
    provider: ethers.BrowserProvider | undefined;
    address: string;
    signer: Signer | undefined;
    login: (provider: ethers.BrowserProvider) => void;
    logout: () => void;
    setAddress: React.Dispatch<React.SetStateAction<string>>;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    setSigner: Dispatch<SetStateAction<ethers.Signer | undefined>>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {

    // const clientId = process.env.NEXT_PUBLIC_CLIENT_ID; TODO

    const router = useRouter()
    const pathname = usePathname()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [address, setAddress] = useState<string>('')
    const [signer, setSigner] = useState<Signer | undefined >()
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
                signer,
                login,
                logout,
                setAddress,
                setSigner,
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

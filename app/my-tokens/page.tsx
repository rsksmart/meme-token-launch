'use client'

import ConnectedWallet from "@/components/connectedWallet";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ConnectWalletButton from "@/components/ui/connectWalletButton";
import { useAuth } from "@/context/AuthContext";
import DeployToken from "@/components/deployToken";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ROUTER } from "@/constants";
import ListTokens from "@/components/listTokens";

export default function TokenLaunch() {
    const { isLoggedIn } = useAuth();

    const router = useRouter()

    return (
        <main className="h-full w-full flex flex-col">
            <Navbar />
            <section className="w-full px-6 xl:px-0 md:w-[1000px] xl:w-[1300px] m-auto mt-4">
                <div className="flex justify-between flex-row">
                    <h1 className="md:text-6xl xl:text-[78px] relative z-10 font-bold text-black flex flex-col gap-2.5">
                        <span className="max-w-max px-1.5 bg-white">Meme Token Launch</span>
                        <span className="flex gap-2">
                            <span className="bg-custom-green px-1.5 w-max xl:text-5xl">
                                Memes
                            </span>
                            <span className="bg-title px-1.5 w-max xl:text-5xl">
                                on Rootstock
                            </span>
                        </span>
                    </h1>
                    {isLoggedIn ?
                        (
                            <div className="flex items-center gap-4">
                                <ConnectedWallet />
                            </div>
                        ) :
                        (
                            <div className="flex items-center gap-4">
                                <ConnectWalletButton />
                            </div>
                        )
                    }
                </div>

                <div className="mt-10 w-full flex flex-col justify-center gap-4">
                    <div className="flex items-end justify-between flex-row gap-6">
                        <h1 className="text-2xl font-bold">Your tokens</h1>
                        <Button
                            className="bg-white text-2xl text-black before:w-full active:bg-slate-400"
                            type="submit"
                            variant={'outline'}
                            onClick={() => router.push(ROUTER.DEPLOY_TOKEN)}>
                            Deploy a new token
                        </Button>
                    </div>
                    <div className="mt-8">
                        <ListTokens />
                    </div>
                </div>

            </section>
            <Footer />
        </main>
    );
}
